import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMCPAnimation } from '../hooks/useMCPAnimation';

// Palantir-inspired styled components
const Container = styled.div`
  background-color: #000;
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  min-height: 100vh;
  padding: 0;
  margin: 0;
`;

const Header = styled.header`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const NavBar = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: #111;
  overflow-x: auto;
  white-space: nowrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.active ? '#fff' : 'transparent'};
  }
  
  &:hover {
    color: #fff;
  }
`;

const SeeAllButton = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 0.8rem;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const HeroSection = styled.div`
  padding: 4rem 2rem;
  background-color: #111;
  position: relative;
`;

const ThesisTag = styled.div`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  max-width: 800px;
  letter-spacing: -0.02em;
  line-height: 1.1;
  
  &::after {
    content: '↗';
    font-size: 1.5rem;
    margin-left: 0.5rem;
    vertical-align: super;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const PdfButton = styled.button`
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ShareButton = styled(PdfButton)``;

const MainContent = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 6rem;
  font-weight: 600;
  margin: 0 0 3rem 0;
  letter-spacing: -0.02em;
  line-height: 1;
  color: #fff;
`;

const TaskSection = styled.div`
  margin-bottom: 5rem;
`;

const TaskTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin: 3rem 0 1.5rem 0;
  letter-spacing: -0.02em;
`;

const TaskDescription = styled.div`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
`;

const SolutionCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 4px;
  padding: 2rem;
  margin-bottom: 2rem;
  border-left: 4px solid #fff;
`;

const SolutionTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
`;

const SolutionText = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const Formula = styled.div`
  font-family: 'JetBrains Mono', 'SF Mono', monospace;
  padding: 1.5rem;
  margin: 1.5rem 0;
  background-color: #000;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 1rem;
  line-height: 1.6;
`;

const Highlight = styled.span`
  color: #fff;
  font-weight: 600;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent);
  padding: 0 0.3rem;
`;

const MetaInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 4rem 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MetaColumn = styled.div``;

const MetaLabel = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
`;

const MetaValue = styled.div`
  font-size: 1rem;
`;

const ScrollIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
  
  &::before {
    content: '↓';
    font-size: 1rem;
  }
`;

const KeyTakeaways = styled.div`
  background-color: #1a1a1a;
  padding: 2rem;
  margin: 3rem 0;
  border-left: 4px solid #fff;
`;

const KeyTakeawaysTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
`;

const PalantirEconometricsSolutions: React.FC = () => {
  const fadeAnimation = useMCPAnimation({
    variant: 'fade',
    duration: 'medium',
  });
  
  const [activeTab, setActiveTab] = useState<'task1' | 'task2' | 'task3' | 'task4' | 'task5'>('task1');

  return (
    <Container>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeAnimation.variants}
      >
        <Header>
          <Logo>Econometrics</Logo>
          <PdfButton>Get Started</PdfButton>
        </Header>
        
        <NavBar>
          <NavItem active={activeTab === 'task1'} onClick={() => setActiveTab('task1')}>
            Task 1
          </NavItem>
          <NavItem active={activeTab === 'task2'} onClick={() => setActiveTab('task2')}>
            Task 2
          </NavItem>
          <NavItem active={activeTab === 'task3'} onClick={() => setActiveTab('task3')}>
            Task 3
          </NavItem>
          <NavItem active={activeTab === 'task4'} onClick={() => setActiveTab('task4')}>
            Task 4
          </NavItem>
          <NavItem active={activeTab === 'task5'} onClick={() => setActiveTab('task5')}>
            Task 5
          </NavItem>
          <NavItem>Regression Analysis</NavItem>
          <NavItem>Statistical Inference</NavItem>
          <NavItem>Hypothesis Testing</NavItem>
          <SeeAllButton>SEE ALL</SeeAllButton>
        </NavBar>
        
        <HeroSection>
          <ThesisTag>Problem Set 2</ThesisTag>
          <HeroTitle>Applied Econometrics</HeroTitle>
          
          <ActionButtons>
            <PdfButton>
              PDF
              <span>↓</span>
            </PdfButton>
            <ShareButton>
              SHARE
              <span>→</span>
            </ShareButton>
          </ActionButtons>
        </HeroSection>
        
        <MainContent>
          <ScrollIndicator>Scroll to read</ScrollIndicator>
          
          <SectionTitle>
            {activeTab === 'task1' ? 'Understanding Parameters' : activeTab === 'task2' ? 'Regression Analysis' : activeTab === 'task3' ? 'Time Pressure Effect Analysis' : activeTab === 'task4' ? 'Perfect Multicollinearity Analysis' : 'Omitted Variable Analysis'}
          </SectionTitle>
          
          {activeTab === 'task1' && (
            <TaskSection>
              <TaskTitle>Task 1</TaskTitle>
              <TaskDescription>
                Explain the difference between β₁ and β̂₁; between the regression error u<sub>i</sub> and the residual û<sub>i</sub>; and between E(Y<sub>i</sub>|X<sub>i</sub>) and the OLS predicted value Ŷ<sub>i</sub>.
              </TaskDescription>
              
              <SolutionCard>
                <SolutionTitle>Solution to Task 1</SolutionTitle>
                
                <SolutionText>
                  <p><Highlight>Difference between β₁ and β̂₁:</Highlight></p>
                  <ul>
                    <li><strong>β₁</strong> is the true population parameter (slope coefficient) in the population regression model. It represents the actual relationship between the independent variable X and the dependent variable Y in the population.</li>
                    <li><strong>β̂₁</strong> is the OLS estimator of β₁. It's calculated from sample data and is an estimate of the true population parameter. It's what we actually compute in practice since we don't know the true β₁.</li>
                  </ul>
                  
                  <p><Highlight>Difference between the regression error u<sub>i</sub> and the residual û<sub>i</sub>:</Highlight></p>
                  <ul>
                    <li><strong>u<sub>i</sub></strong> is the true regression error term in the population model. It represents all factors other than X that affect Y. It's unobservable because we don't know the true population parameters.</li>
                    <li><strong>û<sub>i</sub></strong> is the residual, which is the difference between the observed Y<sub>i</sub> and the predicted Ŷ<sub>i</sub> from our estimated regression model. It's our estimate of the unobservable error term u<sub>i</sub>.</li>
                  </ul>
                  
                  <Formula>
                    u<sub>i</sub> = Y<sub>i</sub> - (β₀ + β₁X<sub>i</sub>)<br />
                    û<sub>i</sub> = Y<sub>i</sub> - (β̂₀ + β̂₁X<sub>i</sub>) = Y<sub>i</sub> - Ŷ<sub>i</sub>
                  </Formula>
                  
                  <p><Highlight>Difference between E(Y<sub>i</sub>|X<sub>i</sub>) and the OLS predicted value Ŷ<sub>i</sub>:</Highlight></p>
                  <ul>
                    <li><strong>E(Y<sub>i</sub>|X<sub>i</sub>)</strong> is the conditional expectation of Y given X in the population. It represents the true population regression function: E(Y<sub>i</sub>|X<sub>i</sub>) = β₀ + β₁X<sub>i</sub>.</li>
                    <li><strong>Ŷ<sub>i</sub></strong> is the OLS predicted value based on our estimated regression coefficients: Ŷ<sub>i</sub> = β̂₀ + β̂₁X<sub>i</sub>. It's our estimate of E(Y<sub>i</sub>|X<sub>i</sub>) based on sample data.</li>
                  </ul>
                </SolutionText>
              </SolutionCard>
              
              <MetaInfo>
                <MetaColumn>
                  <MetaLabel>Written by</MetaLabel>
                  <MetaValue>Econometrics Team</MetaValue>
                </MetaColumn>
                <MetaColumn>
                  <MetaLabel>Published</MetaLabel>
                  <MetaValue>March 15, 2023</MetaValue>
                </MetaColumn>
                <MetaColumn>
                  <MetaLabel>Length</MetaLabel>
                  <MetaValue>5 Min Read</MetaValue>
                </MetaColumn>
              </MetaInfo>
            </TaskSection>
          )}
          
          {activeTab === 'task2' && (
            <TaskSection>
              <TaskTitle>Task 2</TaskTitle>
              <TaskDescription>
                Suppose that a researcher, using data on class size (CS) and average test scores from 100 third-grade classes, estimates the OLS regression:
                <Formula>
                  TestScore = 520.4 - 5.82 · CS,&nbsp;&nbsp;&nbsp;R² = 0.08,&nbsp;&nbsp;&nbsp;SER = 11.5<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(20.4)&nbsp;&nbsp;(2.21)
                </Formula>
              </TaskDescription>
              
              <SolutionCard>
                <SolutionTitle>Solution to Task 2.a</SolutionTitle>
                <TaskDescription>
                  A classroom has 22 students. What is the regression's prediction for that classroom's average test score?
                </TaskDescription>
                <SolutionText>
                  To find the predicted test score, we substitute the class size (CS = 22) into our regression equation:
                  <Formula>
                    TestScore = 520.4 - 5.82 · CS<br />
                    TestScore = 520.4 - 5.82 · 22<br />
                    TestScore = 520.4 - 128.04<br />
                    TestScore = 392.36
                  </Formula>
                  
                  Therefore, the regression predicts that a classroom with 22 students will have an average test score of <Highlight>392.36</Highlight>.
                </SolutionText>
              </SolutionCard>
              
              <SolutionCard>
                <SolutionTitle>Solution to Task 2.b</SolutionTitle>
                <TaskDescription>
                  Last year a classroom had 19 students, and this year it has 23 students. What is the regression's prediction for the change in the classroom average test score?
                </TaskDescription>
                <SolutionText>
                  To find the change in the predicted test score, we need to calculate the difference between the predicted scores for class sizes of 19 and 23:
                  
                  <p>For CS = 19:</p>
                  <Formula>
                    TestScore₁₉ = 520.4 - 5.82 · 19 = 520.4 - 110.58 = 409.82
                  </Formula>
                  
                  <p>For CS = 23:</p>
                  <Formula>
                    TestScore₂₃ = 520.4 - 5.82 · 23 = 520.4 - 133.86 = 386.54
                  </Formula>
                  
                  <p>The change in test score:</p>
                  <Formula>
                    ΔTestScore = TestScore₂₃ - TestScore₁₉ = 386.54 - 409.82 = -23.28
                  </Formula>
                  
                  Therefore, the regression predicts that increasing class size from 19 to 23 students will result in a decrease of <Highlight>23.28 points</Highlight> in the average test score.
                  
                  <p>Alternatively, we can directly use the slope coefficient:</p>
                  <Formula>
                    ΔTestScore = -5.82 · ΔCS = -5.82 · (23 - 19) = -5.82 · 4 = -23.28
                  </Formula>
                </SolutionText>
              </SolutionCard>
              
              <SolutionCard>
                <SolutionTitle>Solution to Task 2.c</SolutionTitle>
                <TaskDescription>
                  The sample average class size across the 100 classrooms is 21.4. What is the sample average of the test scores across the 100 classrooms?
                </TaskDescription>
                <SolutionText>
                  In OLS regression, the regression line always passes through the point of sample means (X̄, Ȳ). This means that:
                  
                  <Formula>
                    Ȳ = β̂₀ + β̂₁X̄
                  </Formula>
                  
                  Where Ȳ is the sample mean of test scores and X̄ is the sample mean of class size.
                  
                  Given that X̄ = 21.4, we can find Ȳ:
                  
                  <Formula>
                    Ȳ = 520.4 - 5.82 · 21.4<br />
                    Ȳ = 520.4 - 124.548<br />
                    Ȳ = 395.852
                  </Formula>
                  
                  Therefore, the sample average of test scores across the 100 classrooms is approximately <Highlight>395.85</Highlight>.
                </SolutionText>
              </SolutionCard>
              
              <KeyTakeaways>
                <KeyTakeawaysTitle>Key Takeaways</KeyTakeawaysTitle>
                <SolutionText>
                  <ul>
                    <li>The regression suggests a <Highlight>negative relationship</Highlight> between class size and test scores: on average, an increase of one student in class size is associated with a decrease of 5.82 points in test scores.</li>
                    <li>This relationship is <Highlight>statistically significant</Highlight> (p-value = 0.0086), allowing us to reject the null hypothesis that class size has no effect on test scores.</li>
                    <li>However, the R² value of 0.08 indicates that class size explains only <Highlight>8% of the variation</Highlight> in test scores, suggesting that many other factors influence test performance.</li>
                    <li>The standard error of the regression (SER) of 11.5 gives us a measure of the typical prediction error when using this model.</li>
                  </ul>
                </SolutionText>
              </KeyTakeaways>
              
              <MetaInfo>
                <MetaColumn>
                  <MetaLabel>Written by</MetaLabel>
                  <MetaValue>Econometrics Team</MetaValue>
                </MetaColumn>
                <MetaColumn>
                  <MetaLabel>Published</MetaLabel>
                  <MetaValue>March 15, 2023</MetaValue>
                </MetaColumn>
                <MetaColumn>
                  <MetaLabel>Length</MetaLabel>
                  <MetaValue>15 Min Read</MetaValue>
                </MetaColumn>
              </MetaInfo>
            </TaskSection>
          )}
          
          {activeTab === 'task3' && (
            <TaskSection>
              <TaskTitle>Task 3: Time Pressure Effect Analysis</TaskTitle>
              <TaskDescription>
                A professor decides to run an experiment to measure the effect of time pressure on final exam scores. He gives each of the 400 students in his course the same final exam, but some students have 90 minutes to complete the exam while others have 120 minutes. Each student is randomly assigned one of the examination times based on the flip of a coin. Let Y<sub>i</sub> denote the number of points scored on the exam by the ith student (0 ≤ Y<sub>i</sub> ≤ 100), let X<sub>i</sub> denote the amount of time that the student has to complete the exam (X<sub>i</sub> = 90 or 120), and consider the regression model Y<sub>i</sub> = β₀ + β₁ · X<sub>i</sub> + u<sub>i</sub>.
              </TaskDescription>

              <SolutionCard>
                <SolutionTitle>3.a - Understanding the Error Term</SolutionTitle>
                <TaskDescription>
                  Explain what the term u<sub>i</sub> represents. Why will different students have different values of u<sub>i</sub>?
                </TaskDescription>
                <SolutionText>
                  <p>The term u<sub>i</sub> represents the <Highlight>regression error</Highlight> or <Highlight>disturbance term</Highlight> for student i. It captures all other factors that affect a student's exam score besides the time allowed for the exam. Different students will have different values of u<sub>i</sub> because:</p>
                  
                  <ul>
                    <li><strong>Individual Characteristics:</strong> Students have different:
                      <ul>
                        <li>Natural abilities and aptitudes</li>
                        <li>Study habits and preparation levels</li>
                        <li>Test-taking strategies</li>
                        <li>Stress management skills</li>
                      </ul>
                    </li>
                    <li><strong>External Factors:</strong>
                      <ul>
                        <li>Physical and mental state during the exam</li>
                        <li>Environmental conditions</li>
                        <li>Random events affecting performance</li>
                      </ul>
                    </li>
                    <li><strong>Unobserved Variables:</strong> Any other factors not captured by the time allocation (X<sub>i</sub>) that influence exam performance</li>
                  </ul>
                </SolutionText>
              </SolutionCard>

              <SolutionCard>
                <SolutionTitle>3.b - Zero Conditional Expectation</SolutionTitle>
                <TaskDescription>
                  Explain why E(u<sub>i</sub>|X<sub>i</sub>) = 0 for this regression model.
                </TaskDescription>
                <SolutionText>
                  <p>E(u<sub>i</sub>|X<sub>i</sub>) = 0 holds in this case because of the <Highlight>random assignment</Highlight> of exam times through coin flips. Here's why:</p>

                  <ul>
                    <li><strong>Random Assignment:</strong>
                      <ul>
                        <li>Students are assigned to time slots (90 or 120 minutes) based on coin flips</li>
                        <li>This creates independence between X<sub>i</sub> and any student characteristics</li>
                        <li>The assignment mechanism ensures no systematic relationship between time allocation and student abilities</li>
                      </ul>
                    </li>
                    
                    <li><strong>Implications:</strong>
                      <ul>
                        <li>Students of all ability levels have equal probability of getting either time slot</li>
                        <li>No systematic bias in how students are assigned to different exam durations</li>
                        <li>The error term (u<sub>i</sub>) is independent of the time allocation (X<sub>i</sub>)</li>
                      </ul>
                    </li>
                  </ul>

                  <p>Therefore, for any given time allocation (X<sub>i</sub> = 90 or 120), the expected value of the error term is zero because the random assignment ensures that student characteristics (captured in u<sub>i</sub>) are balanced across time allocations.</p>
                </SolutionText>
              </SolutionCard>

              <SolutionCard>
                <SolutionTitle>3.c - Least Squares Assumptions</SolutionTitle>
                <TaskDescription>
                  Are the other least squares assumptions satisfied? Explain.
                </TaskDescription>
                <SolutionText>
                  <p>Let's examine each of the remaining least squares assumptions:</p>

                  <ul>
                    <li><strong>1. Linearity:</strong> ✓ Likely satisfied
                      <ul>
                        <li>The relationship between time and score may be approximately linear over the limited range (90-120 minutes)</li>
                        <li>The model assumes a constant marginal effect of additional time</li>
                      </ul>
                    </li>

                    <li><strong>2. Random Sampling:</strong> ✓ Satisfied
                      <ul>
                        <li>All 400 students in the course are included</li>
                        <li>Random assignment ensures representative groups</li>
                      </ul>
                    </li>

                    <li><strong>3. No Perfect Collinearity:</strong> ✓ Satisfied
                      <ul>
                        <li>X<sub>i</sub> takes only two values (90 and 120)</li>
                        <li>There is variation in the independent variable</li>
                      </ul>
                    </li>

                    <li><strong>4. Homoskedasticity:</strong> ? Questionable
                      <ul>
                        <li>Variance of errors might differ between time groups</li>
                        <li>Students with more time might show more consistent performance</li>
                        <li>Score ceiling (100) could affect variance at different time allocations</li>
                      </ul>
                    </li>
                  </ul>

                  <p>Overall, most key assumptions are satisfied due to the experimental design, though homoskedasticity might be a concern.</p>
                </SolutionText>
              </SolutionCard>

              <SolutionCard>
                <SolutionTitle>3.d - Regression Analysis</SolutionTitle>
                <TaskDescription>
                  The estimated regression is Ŷ<sub>i</sub> = 49 + 0.24 · X<sub>i</sub>.
                </TaskDescription>
                <SolutionText>
                  <p><strong>i. Score Predictions for Different Time Allocations</strong></p>

                  <Formula>
                    For X<sub>i</sub> = 90 minutes:<br />
                    Ŷ<sub>i</sub> = 49 + 0.24 · 90 = 49 + 21.6 = 70.6 points<br /><br />
                    
                    For X<sub>i</sub> = 120 minutes:<br />
                    Ŷ<sub>i</sub> = 49 + 0.24 · 120 = 49 + 28.8 = 77.8 points<br /><br />
                    
                    For X<sub>i</sub> = 150 minutes:<br />
                    Ŷ<sub>i</sub> = 49 + 0.24 · 150 = 49 + 36 = 85 points
                  </Formula>

                  <p><strong>Note:</strong> While we can mathematically calculate the prediction for 150 minutes, this would be an <Highlight>out-of-sample prediction</Highlight> since no students in the experiment had 150 minutes. Such extrapolation should be interpreted with caution.</p>

                  <p><strong>ii. Impact of Additional Time</strong></p>

                  <Formula>
                    For any 10-minute increase:<br />
                    ΔŶ = β̂₁ · ΔX = 0.24 · 10 = 2.4 points
                  </Formula>

                  <p>The model predicts that giving a student an additional 10 minutes will increase their score by <Highlight>2.4 points</Highlight>, regardless of the initial time allocation. This constant effect is a consequence of the linear specification of the model.</p>
                </SolutionText>
              </SolutionCard>
            </TaskSection>
          )}
          
          {activeTab === 'task4' && (
            <TaskSection>
              <TaskTitle>Task 4: Perfect Multicollinearity Analysis</TaskTitle>
              <TaskDescription>
                Explain why two perfectly multicollinear regressors cannot be included in a linear multiple regression. Give two examples of a pair of perfectly multicollinear regressors.
              </TaskDescription>

              <SolutionCard>
                <SolutionTitle>Understanding Perfect Multicollinearity</SolutionTitle>
                <SolutionText>
                  <p><strong>Why Perfect Multicollinearity is a Problem:</strong></p>
                  
                  <ul>
                    <li><strong>Mathematical Impossibility:</strong>
                      <ul>
                        <li>Perfect multicollinearity means one regressor is an exact linear function of another</li>
                        <li>Makes it impossible to uniquely solve for the regression coefficients</li>
                        <li>The matrix (X'X) becomes singular (non-invertible)</li>
                      </ul>
                    </li>

                    <li><strong>Identification Problem:</strong>
                      <ul>
                        <li>Cannot separately identify the effect of each regressor</li>
                        <li>Infinite combinations of coefficients would fit the data equally well</li>
                        <li>Makes it impossible to determine individual contributions</li>
                      </ul>
                    </li>
                  </ul>

                  <p><strong>Examples of Perfectly Multicollinear Regressors:</strong></p>

                  <p>1. <Highlight>Temperature Measures:</Highlight></p>
                  <Formula>
                    X₁ = Temperature in Celsius<br />
                    X₂ = Temperature in Fahrenheit<br />
                    X₂ = (9/5)X₁ + 32
                  </Formula>

                  <p>2. <Highlight>Dummy Variable Trap:</Highlight></p>
                  <Formula>
                    X₁ = Dummy for Male (0 or 1)<br />
                    X₂ = Dummy for Female (0 or 1)<br />
                    X₁ + X₂ = 1
                  </Formula>

                  <p>3. <Highlight>Age-Related Variables:</Highlight></p>
                  <Formula>
                    X₁ = Age<br />
                    X₂ = Years since birth<br />
                    X₁ = X₂
                  </Formula>

                  <p>4. <Highlight>Price Indices:</Highlight></p>
                  <Formula>
                    X₁ = Price index (Base year 2010 = 100)<br />
                    X₂ = Same price index (Base year 2020 = 100)<br />
                    X₂ = kX₁ (where k is the conversion factor)
                  </Formula>

                  <p>In each case, including both variables would create perfect multicollinearity because one variable can be expressed as an exact linear function of the other.</p>
                </SolutionText>
              </SolutionCard>
            </TaskSection>
          )}
          
          {activeTab === 'task5' && (
            <TaskSection>
              <TaskTitle>Task 5: Omitted Variable Analysis</TaskTitle>
              <TaskDescription>
                (Y<sub>i</sub>, X<sub>1i</sub>, X<sub>2i</sub>) satisfy the least squares assumptions in the multiple linear regression model. You are interested in β₁, the causal effect of X₁ on Y. Suppose that X₁ and X₂ are uncorrelated. You estimate β₁ by regressing Y onto X₁ (so that X₂ is not included in the regression). Does this estimator suffer from omitted variable bias? Explain.
              </TaskDescription>

              <SolutionCard>
                <SolutionTitle>Analyzing Potential Omitted Variable Bias</SolutionTitle>
                <SolutionText>
                  <p>Let's analyze this step by step to determine if omitting X₂ leads to bias in estimating β₁.</p>

                  <p><strong>1. The True Model:</strong></p>
                  <Formula>
                    Y<sub>i</sub> = β₀ + β₁X₁<sub>i</sub> + β₂X₂<sub>i</sub> + u<sub>i</sub>
                  </Formula>

                  <p><strong>2. The Estimated Model:</strong></p>
                  <Formula>
                    Y<sub>i</sub> = γ₀ + γ₁X₁<sub>i</sub> + v<sub>i</sub>
                  </Formula>

                  <p><strong>3. Key Conditions:</strong></p>
                  <ul>
                    <li>X₁ and X₂ are uncorrelated: Cov(X₁, X₂) = 0</li>
                    <li>Least squares assumptions are satisfied for the full model</li>
                  </ul>

                  <p><strong>4. Analysis:</strong></p>
                  <ul>
                    <li>When X₁ and X₂ are uncorrelated, omitting X₂ does <Highlight>not</Highlight> cause bias in estimating β₁</li>
                    <li>This is because:
                      <ul>
                        <li>The omitted variable bias formula is: bias = β₂ · δ₁</li>
                        <li>Where δ₁ is the coefficient from regressing X₂ on X₁</li>
                        <li>When X₁ and X₂ are uncorrelated, δ₁ = 0</li>
                        <li>Therefore, bias = β₂ · 0 = 0</li>
                      </ul>
                    </li>
                  </ul>

                  <p><strong>5. Conclusion:</strong></p>
                  <p>The estimator does <Highlight>not</Highlight> suffer from omitted variable bias. When X₁ and X₂ are uncorrelated, excluding X₂ from the regression will still produce an unbiased estimate of β₁. However, note that while the estimator is unbiased, it may be less efficient (have larger standard errors) than the multiple regression estimator that includes both X₁ and X₂.</p>
                </SolutionText>
              </SolutionCard>
            </TaskSection>
          )}
        </MainContent>
      </motion.div>
    </Container>
  );
};

export default PalantirEconometricsSolutions; 