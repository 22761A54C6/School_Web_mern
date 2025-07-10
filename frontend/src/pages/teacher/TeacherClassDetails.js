import { useEffect } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { Paper, Box, Typography, ButtonGroup, Button, Popper, Grow, ClickAwayListener, MenuList, MenuItem, Chip, Avatar } from '@mui/material';
import { BlackButton, BlueButton} from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp, Visibility, Assignment, Assessment } from "@mui/icons-material";
import styled from 'styled-components';

const TeacherClassDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);

    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const studentColumns = [
        { id: 'name', label: 'Student Name', minWidth: 200 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 120 },
        { id: 'actions', label: 'Actions', minWidth: 200 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`)
        }
        const handleMarks = () => {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`)
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };
        
        return (
            <ActionButtons>
                <ViewButton
                    variant="contained"
                    onClick={() =>
                        navigate("/Teacher/class/student/" + row.id)
                    }
                    startIcon={<Visibility />}
                >
                    View
                </ViewButton>
                
                <React.Fragment>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <ActionButton onClick={handleClick}>
                            {options[selectedIndex]}
                        </ActionButton>
                        <DropdownButton
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </DropdownButton>
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </React.Fragment>
            </ActionButtons>
        );
    };

    return (
        <ClassDetailsContainer>
            {loading ? (
                <LoadingContainer>
                    <LoadingText>Loading class details...</LoadingText>
                </LoadingContainer>
            ) : (
                <>
                    <HeaderSection>
                        <HeaderIcon>
                            <Assignment />
                        </HeaderIcon>
                        <HeaderText>
                            <HeaderTitle>Class Details</HeaderTitle>
                            <HeaderSubtitle>
                                Manage your students and their progress
                            </HeaderSubtitle>
                        </HeaderText>
                    </HeaderSection>

                    {getresponse ? (
                        <EmptyState>
                            <EmptyIcon>
                                <Assessment />
                            </EmptyIcon>
                            <EmptyTitle>No Students Found</EmptyTitle>
                            <EmptySubtitle>
                                There are currently no students enrolled in this class.
                            </EmptySubtitle>
                        </EmptyState>
                    ) : (
                        <ContentSection>
                            <SectionHeader>
                                <Typography variant="h5" component="h2" sx={{ 
                                    fontWeight: 600, 
                                    color: '#1a1a1a',
                                    mb: 1
                                }}>
                                    Students List
                                </Typography>
                                <StudentCount>
                                    <Chip 
                                        label={`${sclassStudents?.length || 0} Students`}
                                        color="primary"
                                        variant="outlined"
                                    />
                                </StudentCount>
                            </SectionHeader>

                            {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                                <TableContainer>
                                    <TableTemplate 
                                        buttonHaver={StudentsButtonHaver} 
                                        columns={studentColumns} 
                                        rows={studentRows} 
                                    />
                                </TableContainer>
                            )}
                        </ContentSection>
                    )}
                </>
            )}
        </ClassDetailsContainer>
    );
};

export default TeacherClassDetails;

const ClassDetailsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(127, 86, 218, 0.3);
  
  .MuiSvgIcon-root {
    font-size: 40px;
  }
`;

const HeaderText = styled.div`
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 0;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #666;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 24px;
  max-width: 500px;
  margin: 0 auto;
`;

const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  margin: 0 auto 24px;
  
  .MuiSvgIcon-root {
    font-size: 48px;
  }
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`;

const EmptySubtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const StudentCount = styled.div``;

const TableContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(127, 86, 218, 0.1);
  overflow: hidden;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const ViewButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    text-transform: none;
    font-weight: 600;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(127, 86, 218, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
      box-shadow: 0 4px 12px rgba(127, 86, 218, 0.4);
      transform: translateY(-1px);
    }
  }
`;

const ActionButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    text-transform: none;
    font-weight: 600;
    border-radius: 8px 0 0 8px;
    box-shadow: 0 2px 8px rgba(127, 86, 218, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
    }
  }
`;

const DropdownButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    text-transform: none;
    font-weight: 600;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 2px 8px rgba(127, 86, 218, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
    }
  }
`;