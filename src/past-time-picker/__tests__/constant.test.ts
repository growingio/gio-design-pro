import { DATE_FORMAT, experimentalShortcutOptions } from '../constant';

describe('PastTimePicker constant', () => {
  it('has date format', () => {
    expect(DATE_FORMAT).toBe('YYYY/MM/DD');
  });

  it('has experimental shortcut options', () => {
    expect(experimentalShortcutOptions).toHaveLength(2);
    expect(experimentalShortcutOptions[0]).toHaveLength(2);
    expect(experimentalShortcutOptions[1]).toHaveLength(1);
    experimentalShortcutOptions.forEach((os) => {
      os.forEach((o) => {
        expect(o.value.startsWith('hour:')).toBeTruthy();
      });
    });
  });
});
