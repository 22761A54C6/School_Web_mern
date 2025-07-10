import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';

const COLOR_MAP = {
  Present: '#22c55e',
  Absent: '#ef4444',
};
const COLORS = ['#22c55e', '#ef4444', '#7f56da', '#6d35a7', '#550080', '#8e44ad', '#9b59b6', '#3498db', '#2980b9', '#27ae60'];

const RADIAN = Math.PI / 180;

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

const CustomTooltip = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(127, 86, 218, 0.1);
  backdrop-filter: blur(10px);
  min-width: 150px;
`;

const TooltipText = styled.p`
  margin: 4px 0;
  font-weight: 500;
  color: #6c757d;
  font-size: 14px;
`;

const TooltipValue = styled.div`
  margin: 8px 0 4px 0;
  font-weight: 600;
  color: #7f56da;
  font-size: 18px;
`;

const ChartArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  height: 700px;
  margin: 0 auto 16px auto;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(127, 86, 218, 0.12);
  padding: 0;
  @media (max-width: 900px) {
    max-width: 480px;
    height: 480px;
    border-radius: 24px;
  }
  @media (max-width: 600px) {
    max-width: 320px;
    height: 320px;
    border-radius: 16px;
  }
`;

const CenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 700;
  color: #7f56da;
  text-align: center;
  pointer-events: none;
  @media (max-width: 900px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  color: #6c757d;
  font-weight: 500;
  @media (max-width: 900px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const LegendColor = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: ${props => props.color};
  border: 1.5px solid #e5e7eb;
`;

const PieWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text 
            x={x} 
            y={y} 
            fill="white" 
            textAnchor={x > cx ? 'start' : 'end'} 
            dominantBaseline="central"
            fontSize="12"
            fontWeight="600"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0].payload;
        return (
            <CustomTooltip>
                <TooltipText>{name}</TooltipText>
                <TooltipValue>{value}</TooltipValue>
            </CustomTooltip>
        );
    }
    return null;
};

const CustomPieChart = ({ data, title = "Pie Chart" }) => {
    // Calculate total for center label
    const total = data.reduce((sum, entry) => sum + Number(entry.value), 0);
    const present = data.find(d => d.name.toLowerCase().includes('present'));
    const presentPercent = present ? ((present.value / total) * 100).toFixed(0) : '0';

    return (
        <ChartContainer>
            <ChartTitle>{title}</ChartTitle>
            <ChartArea>
                <PieWrapper>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                <radialGradient id="pieGradient" cx="50%" cy="50%" r="80%">
                                    <stop offset="0%" stopColor="#b794f4" stopOpacity={0.7} />
                                    <stop offset="100%" stopColor="#7f56da" stopOpacity={1} />
                                </radialGradient>
                            </defs>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius="80%"
                                innerRadius="50%"
                                fill="url(#pieGradient)"
                                dataKey="value"
                                stroke="rgba(255, 255, 255, 0.8)"
                                strokeWidth={2}
                                isAnimationActive={true}
                                animationDuration={1200}
                                style={{ filter: 'drop-shadow(0 4px 16px rgba(127,86,218,0.15))' }}
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={COLOR_MAP[entry.name] || COLORS[index % COLORS.length]}
                                        stroke="rgba(255, 255, 255, 0.8)"
                                        strokeWidth={1}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltipContent />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <CenterLabel>{presentPercent}%<br/><span style={{fontSize:'1rem',fontWeight:400}}>Present</span></CenterLabel>
                </PieWrapper>
            </ChartArea>
            <Legend>
                {data.map((entry, index) => {
                    const percent = total ? ((entry.value / total) * 100).toFixed(0) : 0;
                    return (
                        <LegendItem key={index}>
                            <LegendColor color={COLOR_MAP[entry.name] || COLORS[index % COLORS.length]} />
                            {entry.name} ({percent}%)
                        </LegendItem>
                    );
                })}
            </Legend>
        </ChartContainer>
    );
};

export default CustomPieChart;