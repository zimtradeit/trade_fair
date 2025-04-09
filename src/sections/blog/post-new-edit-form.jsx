import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import axios from 'axios';

// ----------------------------------------------------------------------

const UploadMinutesSchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required!' }),
  meetingId: zod.string().min(1, { message: 'Meeting selection is required!' }),
  coverUrl: schemaHelper.file({
    message: 'File is required!',
    extensions: ['pdf', 'doc', 'docx'], // Restrict to allowed extensions
  }),
});

// ----------------------------------------------------------------------

export function PostNewEditForm({ currentPost }) {
  const router = useRouter();

  const [meetings, setMeetings] = useState([]);

  // Fetch meeting options
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('/api/meetings'); // Replace with actual endpoint
        const data = response.data;

        const formatted = data.map((meeting) => ({
          value: meeting.id,
          label: meeting.title,
        }));

        setMeetings(formatted);
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
      }
    };

    fetchMeetings();
  }, []);

  const defaultValues = {
    title: '',
    meetingId: '',
    coverUrl: null,
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UploadMinutesSchema),
    defaultValues,
    values: currentPost,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentPost ? 'Update success!' : 'Upload success!');
      router.push(paths.dashboard.post.root);
      console.info('UPLOAD DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  const renderDetails = () => (
    <Card>
      <CardHeader title="Upload Minutes" subheader="Details of the meeting minutes…" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="Title" />

        <Field.Select
          name="meetingId"
          label="Select Meeting"
          options={meetings}
          placeholder="Choose a meeting"
        />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Upload File</Typography>
          <Field.Upload
            name="coverUrl"
            accept={{
              'application/pdf': ['.pdf'],
              'application/msword': ['.doc'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            }}
            maxSize={3145728} // 3MB
            onDelete={handleRemoveFile}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <FormControlLabel
        label="Publish"
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentPost ? 'Upload Minutes' : 'Save changes'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderActions()}
      </Stack>
    </Form>
  );
}
