import { z as zod } from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import { Autocomplete, TextField, Chip } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

const NewCommitteeSchema = zod.object({
  committeeName: zod.string().min(1, { message: 'Committee Name is required!' }),
  chairperson: zod.string().min(1, { message: 'Chairperson is required!' }),
  members: zod.array(zod.string()).min(1, { message: 'Select at least one member!' }),
});

export function CommitteeNewEditForm() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:8000/api/auth/list/view/');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewCommitteeSchema),
    defaultValues: {
      committeeName: '',
      chairperson: '',
      members: [],
    },
  });

  const { handleSubmit, control, formState: { isSubmitting } } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Committee created successfully!');
      router.push('/dashboard/committees');
      console.info('Submitted Data:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card>
        <CardHeader title="Create Committee" />
        <Divider />
        <Stack spacing={3} sx={{ p: 3 }}>
          <Field.Text name="committeeName" label="Committee Name" placeholder="Enter committee name" />

          <Controller
            name="chairperson"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={users}
                getOptionLabel={(option) => option}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => <TextField {...params} label="Chairperson" required />}
              />
            )}
          />

          <Controller
            name="members"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={users}
                getOptionLabel={(option) => option}
                onChange={(_, value) => field.onChange(value)}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option} label={option} />
                  ))
                }
                renderInput={(params) => <TextField {...params} label="Members" placeholder="Select members" />}
              />
            )}
          />

          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            Create Committee
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
