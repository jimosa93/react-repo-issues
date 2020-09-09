import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Issue from '../../components/Issue';

const issueData = {
  title: 'issue title',
  id: 1234,
  number: 1234,
  body: 'some body',
  created_at: new Date('2015-12-21T16:28:31Z'),
  labels: [
    { id: 12345, name: 'label 1' },
    { id: 11111, name: 'label 2' },
    { id: 11112, name: 'label 3' }
  ]
};

describe('Issues', () => {
  it('Labels render correctly', () => {
    const { getByTestId } = render(<Issue issue={issueData} />);

    const wrapperLabels = getByTestId('labels-wrapper');
    expect(wrapperLabels.children.length).toEqual(3);
  });

  it('Buttons details toggle correctly', () => {
    const { getByTestId } = render(<Issue issue={issueData} />);
    fireEvent.click(getByTestId('button-details'));
    expect(getByTestId('collapse')).toBeVisible();
  });
});
