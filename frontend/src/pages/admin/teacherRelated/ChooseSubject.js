import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableContainer, TableHead, Typography, Paper, Card, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import styled from 'styled-components';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false)

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id
            dispatch(getTeacherFreeClassSubjects(classID));
        }
        else if (situation === "Teacher") {
            const { classID, teacherID } = params
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation, params, dispatch]);

    if (loading) {
        return (
            <Container>
                <LoadingCard>
                    <LoadingText>Loading subjects...</LoadingText>
                </LoadingCard>
            </Container>
        );
    } else if (response) {
        return (
            <Container>
                <EmptyStateCard>
                    <EmptyStateIcon>
                        <SubjectIcon />
                    </EmptyStateIcon>
                    <EmptyStateTitle>All Subjects Assigned</EmptyStateTitle>
                    <EmptyStateSubtitle>
                        All subjects in this class already have teachers assigned. Add more subjects to continue.
                    </EmptyStateSubtitle>
                    <AddSubjectButton
                        variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                        startIcon={<AddIcon />}
                    >
                        Add Subjects
                    </AddSubjectButton>
                </EmptyStateCard>
            </Container>
        );
    } else if (error) {
        console.log(error)
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true)
        dispatch(updateTeachSubject(teacherId, teachSubject))
        navigate("/Admin/teachers")
    }

    return (
        <Container>
            <HeaderSection>
                <HeaderContent>
                    <HeaderIcon>
                        <SubjectIcon />
                    </HeaderIcon>
                    <HeaderText>
                        <HeaderTitle>Choose a Subject</HeaderTitle>
                        <HeaderSubtitle>
                            {situation === "Norm" 
                                ? "Select a subject to assign a teacher" 
                                : "Select a subject to assign to this teacher"}
                        </HeaderSubtitle>
                    </HeaderText>
                </HeaderContent>
            </HeaderSection>

            <ContentCard>
                <TableContainer>
                    <Table aria-label="subjects table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell align="center">Subject Name</StyledTableCell>
                                <StyledTableCell align="center">Subject Code</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => (
                                <StyledTableRow key={subject._id} hover>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <SubjectName>{subject.subName}</SubjectName>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <SubjectCode>{subject.subCode}</SubjectCode>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {situation === "Norm" ? (
                                            <ChooseButton
                                                variant="contained"
                                                onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                                                startIcon={<CheckCircleIcon />}
                                            >
                                                Choose
                                            </ChooseButton>
                                        ) : (
                                            <AssignButton
                                                variant="contained"
                                                disabled={loader}
                                                onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                                startIcon={loader ? null : <CheckCircleIcon />}
                                            >
                                                {loader ? (
                                                    <div className="load"></div>
                                                ) : (
                                                    'Assign Subject'
                                                )}
                                            </AssignButton>
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ContentCard>
        </Container>
    );
};

export default ChooseSubject;

const Container = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const HeaderSection = styled.div`
  margin-bottom: 32px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  
  .MuiSvgIcon-root {
    font-size: 28px;
  }
`;

const HeaderText = styled.div``;

const HeaderTitle = styled(Typography)`
  && {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }
`;

const HeaderSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
  }
`;

const ContentCard = styled(Paper)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

const LoadingCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 48px;
    text-align: center;
  }
`;

const LoadingText = styled(Typography)`
  && {
    font-size: 18px;
    color: #64748b;
    font-weight: 500;
  }
`;

const EmptyStateCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 48px;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const EmptyStateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  margin: 0 auto 24px;
  
  .MuiSvgIcon-root {
    font-size: 40px;
  }
`;

const EmptyStateTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
  }
`;

const EmptyStateSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
    margin-bottom: 32px;
    line-height: 1.6;
  }
`;

const AddSubjectButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 600;
    text-transform: none;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(127, 86, 218, 0.3);
    }
  }
`;

const SubjectName = styled.span`
  font-weight: 600;
  color: #1e293b;
`;

const SubjectCode = styled.span`
  font-weight: 500;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 14px;
`;

const ChooseButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 600;
    text-transform: none;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
  }
`;

const AssignButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 600;
    text-transform: none;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(127, 86, 218, 0.3);
    }
    
    &:disabled {
      background: #e2e8f0;
      color: #94a3b8;
    }
  }
`;