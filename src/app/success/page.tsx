import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  LinearProgress,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import {
  TrendingUp,
  School,
  Timer,
  Star,
  PlayArrow,
  BookmarkBorder,
} from '@mui/icons-material';

export default function DashboardPage() {
  const userProgress = {
    coursesCompleted: 2,
    totalCourses: 8,
    currentStreak: 12,
    totalStudyTime: 45,
    level: 'Intermediate',
    points: 1250,
  };

  const courses = [
    {
      id: 1,
      title: 'Word Mining Fundamentals',
      progress: 100,
      status: 'completed',
      duration: '4 weeks',
      nextLesson: null,
    },
    {
      id: 2,
      title: 'Advanced Language Analytics',
      progress: 65,
      status: 'in-progress',
      duration: '8 weeks',
      nextLesson: 'Semantic Analysis Techniques',
    },
    {
      id: 3,
      title: 'Multilingual Mastery',
      progress: 0,
      status: 'not-started',
      duration: '12 weeks',
      nextLesson: 'Introduction to Language Families',
    },
  ];

  const recentActivity = [
    { action: 'Completed', item: 'Etymology Deep Dive', time: '2 hours ago' },
    { action: 'Started', item: 'Semantic Analysis', time: '1 day ago' },
    { action: 'Achieved', item: '7-day streak!', time: '2 days ago' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, Word Miner! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Continue your journey of linguistic discovery
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Stats Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <TrendingUp color="primary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6">{userProgress.currentStreak}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Day Streak
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Timer color="secondary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6">{userProgress.totalStudyTime}h</Typography>
                <Typography variant="body2" color="text.secondary">
                  Study Time
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <School color="primary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6">
                  {userProgress.coursesCompleted}/{userProgress.totalCourses}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Courses
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Star color="secondary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6">{userProgress.points}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Points
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Courses Progress */}
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Your Courses
            </Typography>
            <Stack spacing={3}>
              {courses.map((course) => (
                <Box key={course.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.duration} • {course.nextLesson || 'Completed'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={course.status.replace('-', ' ')}
                        color={
                          course.status === 'completed'
                            ? 'success'
                            : course.status === 'in-progress'
                            ? 'primary'
                            : 'default'
                        }
                        size="small"
                      />
                      <Button
                        variant={course.status === 'in-progress' ? 'contained' : 'outlined'}
                        size="small"
                        startIcon={course.status === 'completed' ? <BookmarkBorder /> : <PlayArrow />}
                      >
                        {course.status === 'completed'
                          ? 'Review'
                          : course.status === 'in-progress'
                          ? 'Continue'
                          : 'Start'}
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {course.progress}%
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Profile Card */}
          <Paper sx={{ p: 4, mb: 4, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '2rem',
              }}
            >
              WM
            </Avatar>
            <Typography variant="h6" gutterBottom>
              Word Miner
            </Typography>
            <Chip
              label={userProgress.level}
              color="primary"
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              {userProgress.points} points earned
            </Typography>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Stack spacing={2}>
              {recentActivity.map((activity, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                    }}
                  />
                  <Box>
                    <Typography variant="body2">
                      <strong>{activity.action}</strong> {activity.item}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}