import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMCPAnimation } from '../hooks/useMCPAnimation';

// Styled components with Apple-inspired design
const SolutionsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: ${({ theme }) => theme.isDark ? '#f5f5f7' : '#1d1d1f'};
  background-color: ${({ theme }) => theme.isDark ? '#000' : '#f5f5f7'};
`;

const Header = styled.h1`
  font-size: 56px;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.isDark ? '#f5f5f7' : '#1d1d1f'};
`;

const Subheader = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.isDark ? '#86868b' : '#86868b'};
  letter-spacing: -0.02em;
`;

const Disclaimer = styled.p`
  font-style: italic;
  margin: 3rem auto;
  padding: 1rem;
  max-width: 800px;
  text-align: center;
  color: ${({ theme }) => theme.isDark ? '#86868b' : '#86868b'};
  font-size: 0.9rem;
`;

const TaskTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin-top: 4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.isDark ? '#f5f5f7' : '#1d1d1f'};
  text-align: center;
`;

const TaskQuestion = styled.div`
  margin: 0 auto 2.5rem;
  line-height: 1.5;
  font-size: 1.2rem;
  max-width: 800px;
  text-align: center;
  color: ${({ theme }) => theme.isDark ? '#86868b' : '#4d4d4d'};
`;

const SolutionCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.isDark ? '#1d1d1f' : '#ffffff'};
  border-radius: 18px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.05)'};
`;

const SolutionTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.isDark ? '#f5f5f7' : '#1d1d1f'};
  text-align: center;
`;

const SolutionText = styled.div`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.isDark ? '#f5f5f7' : '#1d1d1f'};
  font-size: 1.1rem;
`;

const Formula = styled.div`
  font-family: 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  padding: 1.5rem;
  margin: 1.5rem 0;
  background-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  border-radius: 12px;
  overflow-x: auto;
  font-size: 1.1rem;
  text-align: center;
  color: ${({ theme }) => theme.isDark ? '#f5f5f7' : '#1d1d1f'};
`;

const Highlight = styled.span`
  color: #0071e3;
  font-weight: 600;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  margin: 3rem 0;
`;

const KeyTakeaways = styled.div`
  background-color: ${({ theme }) => theme.isDark ? 'rgba(0, 113, 227, 0.1)' : 'rgba(0, 113, 227, 0.05)'};
  border-radius: 18px;
  padding: 2rem;
  margin: 3rem auto;
  max-width: 800px;
  border-left: 4px solid #0071e3;
`;

const KeyTakeawaysTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #0071e3;
`;

const HeroSection = styled.div`
  text-align: center;
  margin: 4rem 0;
  padding: 4rem 0;
  background: ${({ theme }) => theme.isDark 
    ? 'linear-gradient(180deg, #000 0%, #1a1a1a 100%)' 
    : 'linear-gradient(180deg, #f5f5f7 0%, #e5e5e5 100%)'};
`;

const HeroTitle = styled.h1`
  font-size: 64px;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #0071e3, #00c7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
`;

const HeroSubtitle = styled.h2`
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.isDark ? '#86868b' : '#86868b'};
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  gap: 1rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  border: none;
  background-color: ${({ active, theme }) => 
    active 
      ? theme.isDark ? '#0071e3' : '#0071e3' 
      : theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${({ active, theme }) => 
    active 
      ? '#ffffff' 
      : theme.isDark ? '#f5f5f7' : '#1d1d1f'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active, theme }) => 
      active 
        ? '#0071e3' 
        : theme.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
  }
`;

const EconometricsSolutions: React.FC = () => {
  const fadeAnimation = useMCPAnimation({
    variant: 'fade',
    duration: 'medium',
  });
  
  const [activeTab, setActiveTab] = useState<'task1' | 'task2' | 'task3' | 'task4' | 'task5'>('task1');

  return (
    <SolutionsContainer>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeAnimation.variants}
      >
        <HeroSection>
          <HeroTitle>Applied Econometrics</HeroTitle>
          <HeroSubtitle>Problem Set 2</HeroSubtitle>
        </HeroSection>
        
        <Disclaimer>
          Disclaimer: The following problems are taken from Introduction to Economics by Stock and Watson: Chapter 4, and Chapter 6
        </Disclaimer>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'task1'} 
            onClick={() => setActiveTab('task1')}
          >
            Task 1
          </Tab>
          <Tab 
            active={activeTab === 'task2'} 
            onClick={() => setActiveTab('task2')}
          >
            Task 2
          </Tab>
          <Tab 
            active={activeTab === 'task3'} 
            onClick={() => setActiveTab('task3')}
          >
            Task 3
          </Tab>
          <Tab 
            active={activeTab === 'task4'} 
            onClick={() => setActiveTab('task4')}
          >
            Task 4
          </Tab>
          <Tab 
            active={activeTab === 'task5'} 
            onClick={() => setActiveTab('task5')}
          >
            Task 5
          </Tab>
        </TabsContainer>
        
        {activeTab === 'task1' && (
          <>
            <TaskTitle>Task 1</TaskTitle>
            <TaskQuestion>
              Explain the difference between β₁ and β̂₁; between the regression error u<sub>i</sub> and the residual û<sub>i</sub>; and between E(Y<sub>i</sub>|X<sub>i</sub>) and the OLS predicted value Ŷ<sub>i</sub>.
            </TaskQuestion>
            
            <SolutionCard
              initial="initial"
              animate="animate"
              variants={fadeAnimation.variants}
            >
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
          </>
        )}
        
        {activeTab === 'task2' && (
          <>
            <TaskTitle>Task 2</TaskTitle>
            <TaskQuestion>
              Suppose that a researcher, using data on class size (CS) and average test scores from 100 third-grade classes, estimates the OLS regression:
              <Formula>
                TestScore = 520.4 - 5.82 · CS,&nbsp;&nbsp;&nbsp;R² = 0.08,&nbsp;&nbsp;&nbsp;SER = 11.5<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(20.4)&nbsp;&nbsp;(2.21)
              </Formula>
            </TaskQuestion>
            
            <SolutionCard>
              <SolutionTitle>Solution to Task 2.a</SolutionTitle>
              <TaskQuestion>
                A classroom has 22 students. What is the regression's prediction for that classroom's average test score?
              </TaskQuestion>
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
              <TaskQuestion>
                Last year a classroom had 19 students, and this year it has 23 students. What is the regression's prediction for the change in the classroom average test score?
              </TaskQuestion>
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
              <TaskQuestion>
                The sample average class size across the 100 classrooms is 21.4. What is the sample average of the test scores across the 100 classrooms?
              </TaskQuestion>
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
            
            <SolutionCard>
              <SolutionTitle>Solution to Task 2.d</SolutionTitle>
              <TaskQuestion>
                What is the sample standard deviation of test scores across the 100 classrooms?<br />
                Hint: Review the formulas for the R² and SER.
              </TaskQuestion>
              <SolutionText>
                We can use the relationship between R², SER (standard error of the regression), and the sample standard deviation of Y (s<sub>Y</sub>).
                
                The formula relating these is:
                
                <Formula>
                  SER = s<sub>Y</sub> · √(1 - R²)
                </Formula>
                
                Rearranging to solve for s<sub>Y</sub>:
                
                <Formula>
                  s<sub>Y</sub> = SER / √(1 - R²)
                </Formula>
                
                Substituting the given values (SER = 11.5, R² = 0.08):
                
                <Formula>
                  s<sub>Y</sub> = 11.5 / √(1 - 0.08)<br />
                  s<sub>Y</sub> = 11.5 / √0.92<br />
                  s<sub>Y</sub> = 11.5 / 0.959<br />
                  s<sub>Y</sub> ≈ 11.99
                </Formula>
                
                Therefore, the sample standard deviation of test scores across the 100 classrooms is approximately <Highlight>11.99</Highlight>.
              </SolutionText>
            </SolutionCard>
            
            <SolutionCard>
              <SolutionTitle>Solution to Task 2.e</SolutionTitle>
              <TaskQuestion>
                Construct a 95% confidence interval for the regression slope coefficient β₁.
              </TaskQuestion>
              <SolutionText>
                The formula for a 95% confidence interval for the slope coefficient β₁ is:
                
                <Formula>
                  β̂₁ ± t<sub>0.025,n-2</sub> · SE(β̂₁)
                </Formula>
                
                Where:
                <ul>
                  <li>β̂₁ = -5.82 (the estimated slope coefficient)</li>
                  <li>SE(β̂₁) = 2.21 (the standard error of the slope coefficient)</li>
                  <li>t<sub>0.025,n-2</sub> is the critical t-value with n-2 degrees of freedom</li>
                </ul>
                
                With 100 observations, we have 98 degrees of freedom (n-2 = 100-2 = 98).
                For large samples (df {'>'} 30), the critical t-value for a 95% confidence interval is approximately 1.96.
                
                <Formula>
                  CI<sub>95%</sub> = -5.82 ± 1.96 · 2.21<br />
                  CI<sub>95%</sub> = -5.82 ± 4.33<br />
                  CI<sub>95%</sub> = [-10.15, -1.49]
                </Formula>
                
                Therefore, we are 95% confident that the true value of β₁ lies between <Highlight>-10.15 and -1.49</Highlight>.
              </SolutionText>
            </SolutionCard>
            
            <SolutionCard>
              <SolutionTitle>Solution to Task 2.f</SolutionTitle>
              <TaskQuestion>
                Construct the p-value for the two-sided test of the null hypothesis H₀: β₁ = 0. Do you reject the null hypothesis at the 5% level? At the 1% level?
              </TaskQuestion>
              <SolutionText>
                To find the p-value, we first calculate the t-statistic:
                
                <Formula>
                  t = β̂₁ / SE(β̂₁) = -5.82 / 2.21 = -2.63
                </Formula>
                
                For a two-sided test, the p-value is the probability of observing a t-statistic more extreme than |t| = 2.63 in either direction.
                
                For a large sample (df {'>'} 30), we can use the standard normal distribution as an approximation:
                
                <Formula>
                  p-value = 2 · P(Z {'>'} 2.63) ≈ 2 · 0.0043 ≈ 0.0086
                </Formula>
                
                Therefore, the p-value is approximately <Highlight>0.0086 or 0.86%</Highlight>.
                
                <p>Decision:</p>
                <ul>
                  <li>At the 5% significance level (α = 0.05): Since p-value = 0.0086 {'<'} 0.05, we <Highlight>reject the null hypothesis</Highlight>.</li>
                  <li>At the 1% significance level (α = 0.01): Since p-value = 0.0086 {'<'} 0.01, we <Highlight>reject the null hypothesis</Highlight>.</li>
                </ul>
                
                We have strong evidence against the null hypothesis that β₁ = 0, suggesting that class size does have a statistically significant effect on test scores.
              </SolutionText>
            </SolutionCard>
            
            <SolutionCard>
              <SolutionTitle>Solution to Task 2.g</SolutionTitle>
              <TaskQuestion>
                Calculate the p-value for the two-sided test of the null hypothesis H₀: β₁ = -5.6. Without doing any additional calculations, determine whether -5.6 is contained in the 95% confidence interval for β₁.
              </TaskQuestion>
              <SolutionText>
                To find the p-value for testing H₀: β₁ = -5.6, we calculate the t-statistic:
                
                <Formula>
                  t = (β̂₁ - β₁<sub>0</sub>) / SE(β̂₁) = (-5.82 - (-5.6)) / 2.21 = -0.22 / 2.21 = -0.10
                </Formula>
                
                For a two-sided test, the p-value is:
                
                <Formula>
                  p-value = 2 · P(Z {'>'} |-0.10|) ≈ 2 · P(Z {'>'} 0.10) ≈ 2 · 0.4602 ≈ 0.9204
                </Formula>
                
                Therefore, the p-value is approximately <Highlight>0.9204 or 92.04%</Highlight>.
                
                <p>Regarding whether -5.6 is contained in the 95% confidence interval:</p>
                
                We previously calculated the 95% confidence interval as [-10.15, -1.49]. Since -5.6 falls within this interval, it is <Highlight>contained in the 95% confidence interval</Highlight> for β₁.
                
                <p>Alternative approach:</p>
                
                We can also determine this directly from the p-value. If the p-value for testing H₀: β₁ = -5.6 is greater than 0.05 (which it is: 0.9204 {'>'} 0.05), then -5.6 is contained in the 95% confidence interval.
              </SolutionText>
            </SolutionCard>
            
            <SolutionCard>
              <SolutionTitle>Solution to Task 2.h</SolutionTitle>
              <TaskQuestion>
                Construct a 99% confidence interval for β₀.
              </TaskQuestion>
              <SolutionText>
                The formula for a 99% confidence interval for the intercept β₀ is:
                
                <Formula>
                  β̂₀ ± t<sub>0.005,n-2</sub> · SE(β̂₀)
                </Formula>
                
                Where:
                <ul>
                  <li>β̂₀ = 520.4 (the estimated intercept)</li>
                  <li>SE(β̂₀) = 20.4 (the standard error of the intercept)</li>
                  <li>t<sub>0.005,n-2</sub> is the critical t-value with n-2 degrees of freedom for a 99% confidence interval</li>
                </ul>
                
                With 100 observations, we have 98 degrees of freedom (n-2 = 100-2 = 98).
                For large samples (df {'>'} 30), the critical t-value for a 99% confidence interval is approximately 2.58.
                
                <Formula>
                  CI<sub>99%</sub> = 520.4 ± 2.58 · 20.4<br />
                  CI<sub>99%</sub> = 520.4 ± 52.63<br />
                  CI<sub>99%</sub> = [467.77, 573.03]
                </Formula>
                
                Therefore, we are 99% confident that the true value of β₀ lies between <Highlight>467.77 and 573.03</Highlight>.
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
          </>
        )}
        
        {activeTab === 'task3' && (
          <>
            <TaskTitle>Task 3</TaskTitle>
            <TaskQuestion>
              A professor decides to run an experiment to measure the effect of time pressure on final exam scores. He gives each of the 400 students in his course the same final exam, but some students have 90 minutes to complete the exam while others have 120 minutes. Each student is randomly assigned one of the examination times based on the flip of a coin. Let Y<sub>i</sub> denote the number of points scored on the exam by the ith student (0 ≤ Y<sub>i</sub> ≤ 100), let X<sub>i</sub> denote the amount of time that the student has to complete the exam (X<sub>i</sub> = 90 or 120), and consider the regression model Y<sub>i</sub> = β₀ + β₁ · X<sub>i</sub> + u<sub>i</sub>.
            </TaskQuestion>

            <SolutionCard>
              <SolutionTitle>Solution to Task 3.a</SolutionTitle>
              <TaskQuestion>
                Explain what the term u<sub>i</sub> represents. Why will different students have different values of u<sub>i</sub>?
              </TaskQuestion>
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
              <SolutionTitle>Solution to Task 3.b</SolutionTitle>
              <TaskQuestion>
                Explain why E(u<sub>i</sub>|X<sub>i</sub>) = 0 for this regression model.
              </TaskQuestion>
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
              <SolutionTitle>Solution to Task 3.c</SolutionTitle>
              <TaskQuestion>
                Are the other least squares assumptions satisfied? Explain.
              </TaskQuestion>
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
              <SolutionTitle>Solution to Task 3.d</SolutionTitle>
              <TaskQuestion>
                The estimated regression is Ŷ<sub>i</sub> = 49 + 0.24 · X<sub>i</sub>.
              </TaskQuestion>
              <SolutionText>
                <p><strong>i. Compute the estimated regression's prediction for the average score of students given 90 minutes to complete the exam. Repeat for 120 minutes and 150 minutes.</strong></p>

                <Formula>
                  For X<sub>i</sub> = 90 minutes:<br />
                  Ŷ<sub>i</sub> = 49 + 0.24 · 90 = 49 + 21.6 = 70.6 points<br /><br />
                  
                  For X<sub>i</sub> = 120 minutes:<br />
                  Ŷ<sub>i</sub> = 49 + 0.24 · 120 = 49 + 28.8 = 77.8 points<br /><br />
                  
                  For X<sub>i</sub> = 150 minutes:<br />
                  Ŷ<sub>i</sub> = 49 + 0.24 · 150 = 49 + 36 = 85 points
                </Formula>

                <p><strong>Note:</strong> While we can mathematically calculate the prediction for 150 minutes, this would be an <Highlight>out-of-sample prediction</Highlight> since no students in the experiment had 150 minutes. Such extrapolation should be interpreted with caution.</p>

                <p><strong>ii. Compute the estimated gain in score for a student who is given an additional 10 minutes on the exam.</strong></p>

                <Formula>
                  For any 10-minute increase:<br />
                  ΔŶ = β̂₁ · ΔX = 0.24 · 10 = 2.4 points
                </Formula>

                <p>The model predicts that giving a student an additional 10 minutes will increase their score by <Highlight>2.4 points</Highlight>, regardless of the initial time allocation. This constant effect is a consequence of the linear specification of the model.</p>
              </SolutionText>
            </SolutionCard>
          </>
        )}
        
        {activeTab === 'task4' && (
          <>
            <TaskTitle>Task 4</TaskTitle>
            <TaskQuestion>
              Explain why two perfectly multicollinear regressors cannot be included in a linear multiple regression. Give two examples of a pair of perfectly multicollinear regressors.
            </TaskQuestion>

            <SolutionCard>
              <SolutionTitle>Solution to Task 4</SolutionTitle>
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
          </>
        )}
        
        {activeTab === 'task5' && (
          <>
            <TaskTitle>Task 5</TaskTitle>
            <TaskQuestion>
              (Y<sub>i</sub>, X<sub>1i</sub>, X<sub>2i</sub>) satisfy the least squares assumptions in the multiple linear regression model. You are interested in β₁, the causal effect of X₁ on Y. Suppose that X₁ and X₂ are uncorrelated. You estimate β₁ by regressing Y onto X₁ (so that X₂ is not included in the regression). Does this estimator suffer from omitted variable bias? Explain.
            </TaskQuestion>

            <SolutionCard>
              <SolutionTitle>Solution to Task 5</SolutionTitle>
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
          </>
        )}
      </motion.div>
    </SolutionsContainer>
  );
};

export default EconometricsSolutions; 