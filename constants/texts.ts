import { StatusEnum } from './entry';

export const submissionInfo = [
  'Submission must be in English language.',
  "We don't accept anything related to adult contents.",
  'We review and approve/reject submissions.',
  'We might edit submissions info to be consistent.',
];

interface IMessage {
  [key: string]: {
    text: string;
    title: string;
    type: 'error' | 'success' | 'pending';
  };
}

export const getAuthMessages = (name: string): IMessage => ({
  error: {
    text: "Couldn't login. Please try again later.",
    title: 'Error',
    type: 'error',
  },
  success: {
    text: 'You have logged in successfully.',
    title: `Welcome ${name}.`,
    type: 'success',
  },
});

export const submitEntryMessages: IMessage = {
  [StatusEnum[0]]: {
    text: 'Entry is already submitted and approved.',
    title: 'Already exists',
    type: 'success',
  },
  [StatusEnum[1]]: {
    text:
      'Entry is already submitted and is waiting for review.' +
      'Please check back later.',
    title: 'Under review',
    type: 'pending',
  },
  [StatusEnum[2]]: {
    text: 'Submissions has been rejected.',
    title: 'Rejected',
    type: 'error',
  },
  error: {
    text: "Couldn't submit. Please try again later.",
    title: 'Error',
    type: 'error',
  },
  success: {
    text:
      'Entry has been submitted successfully and is now waiting for review.',
    title: 'Submitted',
    type: 'success',
  },
};
