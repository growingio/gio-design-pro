import { getEventType, withSelectKey } from '../helper';

describe('helper test', () => {
  it('getEventType', async () => {
    expect(getEventType({ id: 'a', name: 'a', type: 'simple' })).toEqual('event');
    expect(getEventType({ id: 'a', name: 'a', type: 'custom' })).toEqual('event');
    expect(getEventType({ id: 'a', name: 'a', type: 'merged' })).toEqual('event');
    expect(getEventType({ id: 'a', name: 'a', type: 'virtual' })).toEqual('event');
    expect(getEventType({ id: 'a', name: 'a', type: 'prepared' })).toEqual('event');
    expect(getEventType({ id: 'a', name: 'a', type: 'preparedComplex' })).toEqual('measurement');
    expect(getEventType({ id: 'a', name: 'a', type: 'complex' })).toEqual('measurement');
    expect(getEventType({ id: 'a', name: 'a', type: 'otherType' })).toEqual('unknow');
  });
  it('withSelectKey', async () => {
    const processedData = withSelectKey([{ id: 'id', name: 'name', type: 'simple', attributes: [] }]);
    processedData.forEach((data) => expect(data.selectKey).toEqual('simple-id'));
  });
});
