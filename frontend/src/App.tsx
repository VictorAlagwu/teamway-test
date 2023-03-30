import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import {
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import { getPersonalityTraits, getQuestions } from "common/api/questions.api";

const theme = createTheme();

const QuestionSection = ({
  questionId,
  optionId,
  label,
  answers,
  handleAnswerChangeEvent,
}: {
  questionId: string;
  optionId: string;
  label: string;
  answers: Array<any>;
  handleAnswerChangeEvent: any;
}) => {
  return (
    <Grid item xs={12} md={12}>
      <FormControlLabel
        key={optionId}
        control={
          <Checkbox
            checked={answers.some(
              (answer: any) =>
                answer.questionId === questionId && answer.optionId === optionId
            )}
            onChange={(event) => handleAnswerChangeEvent(event, questionId)}
            value={optionId}
          />
        }
        label={label}
      />
    </Grid>
  );
};

const Personality = ({ trait }: { trait: any }) => {
  console.log("Trait", trait);
  return (
    <ListItem>
      <ListItemText primary={trait.name} secondary={`${trait.percent}%`} />
    </ListItem>
  );
};

export const App = () => {
  const [questions, setQuestions] = useState<Array<any>>([]);
  const [answers, setAnswers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPersonalityTrait, setShowPersonalityTrait] =
    useState<boolean>(false);
  const [personalityTraits, setPersonalityTraits] = useState<any>({});

  useEffect(() => {
    const getQuestionsRequest = async () => {
      const response = await getQuestions();
      setQuestions(response.data);
    };

    getQuestionsRequest();
  }, []);

  const handleAnswerChange = (event: any, questionId: number) => {
    const newAnswers = [...answers];
    const index = newAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (index === -1) {
      newAnswers.push({ questionId, optionId: event.target.value });
    } else {
      newAnswers[index].optionId = event.target.value;
    }

    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await getPersonalityTraits({ data: answers });
      setPersonalityTraits(response.data);
      setShowPersonalityTrait(true);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          p: 3,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={1}>
          <Typography
            variant="h5"
            gutterBottom
            justifyContent="center"
            alignItems="center"
          >
            Personality Test
          </Typography>
          {showPersonalityTrait && (
            <div>
                <List
                  sx={{
                    p: 3,
                    width: "100%",
                    paddingTop: 4,
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {Object.keys(personalityTraits).map(
                    (trait: any, index: number) => (
                      <Personality
                        key={trait}
                        trait={personalityTraits[trait]}
                      />
                    )
                  )}
                </List>
            </div>
          )}
          {!showPersonalityTrait && (
            <div>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                marginBottom={2}
                direction="row"
              >
                {questions.map((question, index) => (
                  <Grid item xs={12} md={12} key={question.entityId}>
                    <Paper
                      key={question.entityId}
                      sx={{
                        p: 3,
                        margin: "auto",
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {question.text}
                      </Typography>
                      {question.options.map((value: any, index: number) => (
                        <QuestionSection
                          key={JSON.parse(value).id}
                          answers={answers}
                          questionId={question.entityId}
                          optionId={JSON.parse(value).id}
                          label={JSON.parse(value).text}
                          handleAnswerChangeEvent={handleAnswerChange}
                        />
                      ))}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                color="primary"
                disabled={
                  answers.length < questions.length && !loading ? true : false
                }
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          )}
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
