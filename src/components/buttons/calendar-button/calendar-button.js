import { DateRangePickerOne } from '@/components/datePicker/datePicker';
import { Popover } from '@/components/popup';
import { UilCalendar } from '@iconscout/react-unicons';
import { Button } from '../buttons';

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
