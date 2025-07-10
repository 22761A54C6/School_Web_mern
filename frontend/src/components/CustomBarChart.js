import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const CustomTooltip = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(127, 86, 218, 0.1);
  backdrop-filter: blur(10px);
  min-width: 200px;
`;

const TooltipText = styled.p`
  margin: 4px 0;
  font-weight: 500;
  color: #6c757d;
  font-size: 14px;
`;

const TooltipMain = styled.h3`
  margin: 0 0 8px 0;
  font-weight: 700;
  color: #550080;
  font-size: 16px;
  text-transform: capitalize;
`;

const TooltipValue = styled.div`
  margin: 8px 0 4px 0;
  font-weight: 600;
  color: #7f56da;
  font-size: 18px;
`;

const ChartContainer = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(127, 86, 218, 0.1);
  border: 1px solid rgba(127, 86, 218, 0.05);
  margin: 16px 0;
`;

const ChartTitle = styled.h2`
  color: #550080;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 16px;
  text-align: center;
`;

const CustomTooltipContent = ({ active, payload, dataKey }) => {
    if (active && payload && payload.length) {
        const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload;

        return (
            <CustomTooltip>
                {dataKey === "attendancePercentage" ? (
                    <>
                        <TooltipMain>{subject}</TooltipMain>
                        <TooltipValue>{attendancePercentage}%</TooltipValue>
                        <TooltipText>Attended: {attendedClasses} of {totalClasses} classes</TooltipText>
                    </>
                ) : (
                    <>
                        <TooltipMain>{subName.subName}</TooltipMain>
                        <TooltipValue>{marksObtained} marks</TooltipValue>
                        <TooltipText>Subject Performance</TooltipText>
                    </>
                )}
            </CustomTooltip>
        );
    }

    return null;
};

const CustomBarChart = ({ chartData, dataKey, title = "Chart Data" }) => {
    const subjects = chartData.map((data) => data.subject);
    const distinctColors = generateDistinctColors(subjects.length);

    return (
        <ChartContainer>
            <ChartTitle>{title}</ChartTitle>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                        dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"} 
                        tick={{ fontSize: 12, fill: '#6c757d' }}
                        axisLine={{ stroke: '#e9ecef' }}
                        tickLine={{ stroke: '#e9ecef' }}
                    />
                    <YAxis 
                        domain={[0, 100]} 
                        tick={{ fontSize: 12, fill: '#6c757d' }}
                        axisLine={{ stroke: '#e9ecef' }}
                        tickLine={{ stroke: '#e9ecef' }}
                    />
                    <Tooltip 
                        content={<CustomTooltipContent dataKey={dataKey} />}
                        cursor={{ fill: 'rgba(127, 86, 218, 0.1)' }}
                    />
                    <Bar 
                        dataKey={dataKey}
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                    >
                        {chartData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={distinctColors[index]}
                                stroke="rgba(255, 255, 255, 0.8)"
                                strokeWidth={1}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

// Helper function to generate distinct colors
const generateDistinctColors = (count) => {
    const colors = [
        '#7f56da', '#6d35a7', '#550080', '#8e44ad', '#9b59b6',
        '#3498db', '#2980b9', '#27ae60', '#2ecc71', '#e74c3c',
        '#f39c12', '#e67e22', '#d35400', '#1abc9c', '#16a085'
    ];
    
    return colors.slice(0, count);
};

export default CustomBarChart;
