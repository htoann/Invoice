import { DateRangePickerOne } from '@/components/datePicker/datePicker';
import { Popover } from '@/components/popup';
import { UilCalendar } from '@tooni/iconscout-unicons-react';
import { Button } from '..';

function CalendarButtonPageHeader() {
  const content = <DateRangePickerOne />;

  return (
    <Popover placement="bottomRight" title="Search by Calendar" content={content} action="hover">
      <Button size="small" type="white">
        <UilCalendar />
        Calendar
      </Button>
    </Popover>
  );
}

export { CalendarButtonPageHeader };
