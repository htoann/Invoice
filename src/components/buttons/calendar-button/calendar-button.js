import { DateRangePickerOne } from '@/components/datePicker/datePicker';
import { Popover } from '@/components/popup/popup';
import UilCalendar from '@iconscout/react-unicons/icons/uil-calendar-alt';
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
