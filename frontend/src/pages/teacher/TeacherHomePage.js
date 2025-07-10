import { Container, Grid, Paper, Typography, Box } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions

    return (
        <PageContainer>
            <HeaderSection>
                <WelcomeText>
                    Welcome back, <span className="highlight">{currentUser?.name}</span>
                </WelcomeText>
                <SubtitleText>
                    Here's what's happening with your class today
                </SubtitleText>
            </HeaderSection>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <StatsCard>
                            <CardIcon>
                                <img src={Students} alt="Students" />
                            </CardIcon>
                            <CardContent>
                                <CardTitle>Class Students</CardTitle>
                                <CardData>
                                    <CountUp start={0} end={numberOfStudents || 0} duration={2.5} />
                                </CardData>
                                <CardSubtitle>Total enrolled students</CardSubtitle>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <StatsCard>
                            <CardIcon>
                                <img src={Lessons} alt="Lessons" />
                            </CardIcon>
                            <CardContent>
                                <CardTitle>Total Lessons</CardTitle>
                                <CardData>
                                    <CountUp start={0} end={numberOfSessions || 0} duration={5} />
                                </CardData>
                                <CardSubtitle>Curriculum sessions</CardSubtitle>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <StatsCard>
                            <CardIcon>
                                <img src={Tests} alt="Tests" />
                            </CardIcon>
                            <CardContent>
                                <CardTitle>Tests Taken</CardTitle>
                                <CardData>
                                    <CountUp start={0} end={24} duration={4} />
                                </CardData>
                                <CardSubtitle>Assessments completed</CardSubtitle>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <StatsCard>
                            <CardIcon>
                                <img src={Time} alt="Time" />
                            </CardIcon>
                            <CardContent>
                                <CardTitle>Total Hours</CardTitle>
                                <CardData>
                                    <CountUp start={0} end={30} duration={4} suffix="hrs"/>
                                </CardData>
                                <CardSubtitle>Teaching time</CardSubtitle>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <NoticeSection>
                            <SectionHeader>
                                <Typography variant="h5" component="h2" sx={{ 
                                    fontWeight: 600, 
                                    color: '#1a1a1a',
                                    mb: 1
                                }}>
                                    Recent Notices
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    Stay updated with the latest announcements
                                </Typography>
                            </SectionHeader>
                            <NoticeCard>
                                <SeeNotice />
                            </NoticeCard>
                        </NoticeSection>
                    </Grid>
                </Grid>
            </Container>
        </PageContainer>
    )
}

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px 0;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
  padding: 0 24px;
`;

const WelcomeText = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  
  .highlight {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubtitleText = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 0;
  font-weight: 500;
`;

const StatsCard = styled(Paper)`
  && {
    padding: 24px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    border-radius: 16px;
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(127, 86, 218, 0.1);
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(127, 86, 218, 0.15);
      border-color: rgba(127, 86, 218, 0.2);
    }
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  margin-bottom: 16px;
  
  img {
    width: 32px;
    height: 32px;
    filter: brightness(0) invert(1);
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`;

const CardData = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #7f56da;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CardSubtitle = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
  font-weight: 500;
`;

const NoticeSection = styled.div`
  margin-top: 32px;
`;

const SectionHeader = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

const NoticeCard = styled(Paper)`
  && {
    padding: 24px;
    border-radius: 16px;
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(127, 86, 218, 0.1);
  }
`;

export default TeacherHomePage