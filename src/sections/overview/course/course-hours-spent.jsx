import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { Chart, useChart, ChartSelect } from 'src/components/chart';

// ----------------------------------------------------------------------

export function CourseHoursSpent({ title, subheader, chart, sx, ...other }) {
  const theme = useTheme();

  const [selectedSeries, setSelectedSeries] = useState('Yearly');

  const currentSeries = chart.series.find((i) => i.name === selectedSeries);

  const chartColors = chart.colors ?? [theme.palette.text.primary];

  const chartOptions = useChart({
    grid: { padding: { left: 24 } },
    stroke: { width: 3 },
    colors: chartColors,
    xaxis: { categories: currentSeries?.categories },
    tooltip: { y: { formatter: (value) => `${value} h`, title: { formatter: () => '' } } },
    ...chart.options,
  });

  const handleChangeSeries = useCallback((newValue) => {
    setSelectedSeries(newValue);
  }, []);

  return (
    <Card sx={sx} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <ChartSelect
            options={chart.series.map((item) => item.name)}
            value={selectedSeries}
            onChange={handleChangeSeries}
          />
        }
        sx={{ mb: 3 }}
      />

      <Chart
        type="line"
        series={currentSeries?.data}
        options={chartOptions}
        slotProps={{ loading: { p: 2.5 } }}
        sx={{
          pl: 1,
          py: 2.5,
          pr: 2.5,
          height: 320,
        }}
      />
    </Card>
  );
}
