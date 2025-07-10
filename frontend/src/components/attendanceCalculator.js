/**
 * Calculate the attendance percentage for a subject.
 * @param {number} presentCount - Number of sessions present.
 * @param {number} totalSessions - Total number of sessions.
 * @returns {string} Percentage (to two decimal places).
 */
export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    if (!totalSessions || !presentCount) {
        return '0.00';
    }
    const percentage = (presentCount / totalSessions) * 100;
    return percentage.toFixed(2);
};

/**
 * Group attendance records by subject.
 * @param {Array} subjectAttendance - Array of attendance records.
 * @returns {Object} Grouped attendance by subject name.
 */
export const groupAttendanceBySubject = (subjectAttendance = []) => {
    const attendanceBySubject = {};

    subjectAttendance.forEach((attendance) => {
        const subName = attendance.subName?.subName || 'Unknown Subject';
        const sessions = attendance.subName?.sessions || 0;
        const subId = attendance.subName?._id || '';

        if (!attendanceBySubject[subName]) {
            attendanceBySubject[subName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId
            };
        }
        if (attendance.status === 'Present') {
            attendanceBySubject[subName].present++;
        } else if (attendance.status === 'Absent') {
            attendanceBySubject[subName].absent++;
        }
        attendanceBySubject[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });
    return attendanceBySubject;
};

/**
 * Calculate the overall attendance percentage across all subjects.
 * @param {Array} subjectAttendance - Array of attendance records.
 * @returns {string} Overall attendance percentage (to two decimal places).
 */
export const calculateOverallAttendancePercentage = (subjectAttendance = []) => {
    let totalSessionsSum = 0;
    let presentCountSum = 0;
    const uniqueSubIds = new Set();

    // Map to track sessions per subject
    const sessionsPerSubject = {};

    subjectAttendance.forEach((attendance) => {
        const subId = attendance.subName?._id;
        const sessions = parseInt(attendance.subName?.sessions || 0, 10);
        if (subId && !uniqueSubIds.has(subId)) {
            totalSessionsSum += sessions;
            uniqueSubIds.add(subId);
            sessionsPerSubject[subId] = sessions;
        }
    });

    // Count presents per subject
    const presentCountBySubject = {};
    subjectAttendance.forEach((attendance) => {
        const subId = attendance.subName?._id;
        if (!presentCountBySubject[subId]) presentCountBySubject[subId] = 0;
        if (attendance.status === 'Present') presentCountBySubject[subId]++;
    });

    // Sum all presents
    presentCountSum = Object.values(presentCountBySubject).reduce((a, b) => a + b, 0);

    // If there are no sessions, return 0
    if (!totalSessionsSum) {
        return '0.00';
    }
    return ((presentCountSum / totalSessionsSum) * 100).toFixed(2);
};