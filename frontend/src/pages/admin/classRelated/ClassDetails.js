import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Container, Typography, Tab, IconButton, Paper, Card, CardContent, Grid
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import SubjectIcon from '@mui/icons-material/Subject';
import PersonIcon from '@mui/icons-material/Person';
import styled from 'styled-components';

const ClassDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"))
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getClassStudents(classID));
        //         dispatch(resetSubjects())
        //         dispatch(getSubjectList(classID, "ClassSubjects"))
        //     })
    }

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ]

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
        return {
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <ActionButtons>
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => {
                        navigate(`/Admin/class/subject/${classID}/${row.id}`)
                    }}
                >
                    View
                </BlueButton >
            </ActionButtons>
        );
    };

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => {
        return (
            <SectionContainer>
                {response ?
                    <EmptyState>
                        <EmptyIcon>📚</EmptyIcon>
                        <EmptyTitle>No Subjects Available</EmptyTitle>
                        <EmptyText>This class doesn't have any subjects yet. Add subjects to get started.</EmptyText>
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </GreenButton>
                    </EmptyState>
                    :
                    <>
                        <SectionHeader>
                            <SectionTitle>Subjects List</SectionTitle>
                            <SectionSubtitle>Manage subjects for this class</SectionSubtitle>
                        </SectionHeader>

                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                        <SpeedDialTemplate actions={subjectActions} />
                    </>
                }
            </SectionContainer>
        )
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <ActionButtons>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    onClick={() =>
                        navigate("/Admin/students/student/attendance/" + row.id)
                    }
                >
                    Attendance
                </PurpleButton>
            </ActionButtons>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => {
        return (
            <SectionContainer>
                {getresponse ? (
                    <EmptyState>
                        <EmptyIcon>👥</EmptyIcon>
                        <EmptyTitle>No Students Available</EmptyTitle>
                        <EmptyText>This class doesn't have any students yet. Add students to get started.</EmptyText>
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                        >
                            Add Students
                        </GreenButton>
                    </EmptyState>
                ) : (
                    <>
                        <SectionHeader>
                            <SectionTitle>Students List</SectionTitle>
                            <SectionSubtitle>Manage students in this class</SectionSubtitle>
                        </SectionHeader>

                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                        <SpeedDialTemplate actions={studentActions} />
                    </>
                )}
            </SectionContainer>
        )
    }

    const ClassTeachersSection = () => {
        return (
            <SectionContainer>
                <EmptyState>
                    <EmptyIcon>👨‍🏫</EmptyIcon>
                    <EmptyTitle>Teachers Section</EmptyTitle>
                    <EmptyText>Teacher management features coming soon.</EmptyText>
                </EmptyState>
            </SectionContainer>
        )
    }

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <SectionContainer>
                <HeaderCard>
                    <CardContent>
                        <ClassTitle>
                            {sclassDetails && sclassDetails.sclassName}
                        </ClassTitle>
                        <ClassSubtitle>Class Overview</ClassSubtitle>
                    </CardContent>
                </HeaderCard>

                <StatsGrid>
                    <StatCard>
                        <StatIcon>
                            <SubjectIcon />
                        </StatIcon>
                        <StatContent>
                            <StatNumber>{numberOfSubjects}</StatNumber>
                            <StatLabel>Subjects</StatLabel>
                        </StatContent>
                    </StatCard>

                    <StatCard>
                        <StatIcon>
                            <GroupIcon />
                        </StatIcon>
                        <StatContent>
                            <StatNumber>{numberOfStudents}</StatNumber>
                            <StatLabel>Students</StatLabel>
                        </StatContent>
                    </StatCard>
                </StatsGrid>

                <ActionButtonsContainer>
                    {getresponse &&
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                        >
                            Add Students
                        </GreenButton>
                    }
                    {response &&
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </GreenButton>
                    }
                </ActionButtonsContainer>
            </SectionContainer>
        );
    }

    return (
        <>
            {loading ? (
                <LoadingContainer>
                    <LoadingSpinner />
                    <LoadingText>Loading class details...</LoadingText>
                </LoadingContainer>
            ) : (
                <>
                    <StyledContainer>
                        <TabContext value={value}>
                            <StyledTabList onChange={handleChange}>
                                <StyledTab label="Details" value="1" icon={<SchoolIcon />} />
                                <StyledTab label="Subjects" value="2" icon={<SubjectIcon />} />
                                <StyledTab label="Students" value="3" icon={<GroupIcon />} />
                                <StyledTab label="Teachers" value="4" icon={<PersonIcon />} />
                            </StyledTabList>
                            
                            <TabContent>
                                <TabPanel value="1">
                                    <ClassDetailsSection />
                                </TabPanel>
                                <TabPanel value="2">
                                    <ClassSubjectsSection />
                                </TabPanel>
                                <TabPanel value="3">
                                    <ClassStudentsSection />
                                </TabPanel>
                                <TabPanel value="4">
                                    <ClassTeachersSection />
                                </TabPanel>
                            </TabContent>
                        </TabContext>
                    </StyledContainer>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;

const StyledContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const StyledTabList = styled(TabList)`
  && {
    position: fixed;
    width: 100%;
    background: white;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e2e8f0;
    
    .MuiTabs-indicator {
      background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
      height: 3px;
    }
  }
`;

const StyledTab = styled(Tab)`
  && {
    text-transform: none;
    font-weight: 600;
    font-size: 14px;
    color: #64748b;
    min-height: 64px;
    
    &.Mui-selected {
      color: #7f56da;
    }
    
    .MuiTab-iconWrapper {
      margin-bottom: 4px;
    }
  }
`;

const TabContent = styled(Container)`
  && {
    margin-top: 80px;
    margin-bottom: 32px;
    padding: 24px;
  }
`;

const SectionContainer = styled.div`
  padding: 24px 0;
`;

const HeaderCard = styled(Card)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    border-radius: 16px;
    margin-bottom: 24px;
    box-shadow: 0 8px 32px rgba(127, 86, 218, 0.2);
  }
`;

const ClassTitle = styled(Typography)`
  && {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
    color: white;
  }
`;

const ClassSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    opacity: 0.9;
    color: white;
  }
`;

const StatsGrid = styled(Grid)`
  && {
    margin-bottom: 32px;
  }
`;

const StatCard = styled(Card)`
  && {
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }
  }
`;

const StatIcon = styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    margin-bottom: 16px;
    
    .MuiSvgIcon-root {
      font-size: 28px;
    }
  }
`;

const StatContent = styled.div`
  text-align: center;
`;

const StatNumber = styled(Typography)`
  && {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;
  }
`;

const StatLabel = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }
`;

const SectionSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.6;
`;

const EmptyTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 12px;
  }
`;

const EmptyText = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
    margin-bottom: 24px;
    max-width: 400px;
    line-height: 1.5;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #7f56da;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled(Typography)`
  && {
    color: #64748b;
    font-weight: 500;
    font-size: 16px;
  }
`;