import {
  localeNumberString,
  handleHashRate,
  handleDifficulty,
  parseUDTAmount,
} from '../../utils/number'

describe('Number methods tests', () => {
  it('local number string', async () => {
    expect(localeNumberString('0')).toBe('0')
    expect(localeNumberString('0.00000004')).toBe('0.00000004')
    expect(localeNumberString('0.00034')).toBe('0.00034')
    expect(localeNumberString('222333')).toBe('222,333')
    expect(localeNumberString('2223333')).toBe('2,223,333')
    expect(localeNumberString('22223333')).toBe('22,223,333')
    expect(localeNumberString('2223333.0')).toBe('2,223,333')
    expect(localeNumberString('223.33')).toBe('223.33')
    expect(localeNumberString(-222333)).toBe('-222,333')
    expect(localeNumberString(-2223333)).toBe('-2,223,333')
    expect(localeNumberString(-22223333)).toBe('-22,223,333')
    expect(localeNumberString(-2223333.0)).toBe('-2,223,333')
    expect(localeNumberString(-223.33)).toBe('-223.33')
    expect(localeNumberString('777777223.33454')).toBe('777,777,223.33454')
    expect(localeNumberString('0x66ccff')).toBe('6,737,151')
    expect(localeNumberString('aswqda')).toBe('0')
    expect(localeNumberString('false')).toBe('0')
    expect(localeNumberString('#￥@#￥@')).toBe('0')
  })

  it('parse hash rate', async () => {
    expect(handleHashRate(123)).toBe('123 H/s')
    expect(handleHashRate(12345)).toBe('12.35 KH/s')
    expect(handleHashRate(123454669)).toBe('123.45 MH/s')
    expect(handleHashRate(1234546698945)).toBe('1.23 TH/s')
    expect(handleHashRate(100003439)).toBe('100 MH/s')
    expect(handleHashRate(100000)).toBe('100 KH/s')
    expect(handleHashRate(1000000)).toBe('1 MH/s')
    expect(handleHashRate('0x66ccff')).toBe('6.74 MH/s')
    expect(handleHashRate('aswqda')).toBe('0 H/s')
    expect(handleHashRate('false')).toBe('0 H/s')
    expect(handleHashRate('#￥@#￥@')).toBe('0 H/s')
  })

  it('parse difficulty', async () => {
    expect(handleDifficulty(123)).toBe('123 H')
    expect(handleDifficulty(12345)).toBe('12.35 KH')
    expect(handleDifficulty(123454669)).toBe('123.45 MH')
    expect(handleDifficulty(1234546698945)).toBe('1.23 TH')
    expect(handleDifficulty(100003439)).toBe('100 MH')
    expect(handleDifficulty('0x66ccff')).toBe('6.74 MH')
    expect(handleDifficulty('aswqda')).toBe('0 H')
    expect(handleDifficulty('false')).toBe('0 H')
    expect(handleDifficulty('#￥@#￥@')).toBe('0 H')
  })

  it('parse udt amount', async () => {
    expect(parseUDTAmount('10000023598667', '5')).toBe('100,000,235.98667')
    expect(parseUDTAmount('10000000000000', '5')).toBe('100,000,000')
    expect(parseUDTAmount('10000000000001', '5')).toBe('100,000,000.00001')
    expect(parseUDTAmount('10000000000021', '5')).toBe('100,000,000.00021')
    expect(parseUDTAmount('10000', '6')).toBe('0.01')
    expect(parseUDTAmount('10000', '7')).toBe('0.001')
    expect(parseUDTAmount('2132435', '3')).toBe('2,132.435')
    expect(parseUDTAmount('123456789', '4')).toBe('12,345.6789')
    expect(parseUDTAmount('123456789828456789', '13')).toBe('12,345.6789828456789')
    expect(parseUDTAmount('123456789828456789', '11')).toBe('1,234,567.89828456789')
    expect(parseUDTAmount('123456789828456789', '10')).toBe('12,345,678.9828456789')
    expect(parseUDTAmount('123456780000000000', '8')).toBe('1,234,567,800')
    expect(parseUDTAmount('123456780000600000', '8')).toBe('1,234,567,800.006')
    expect(parseUDTAmount('efd4567898234abc6789', '11')).toBe('0')
    expect(parseUDTAmount('1', '11')).toBe('0.00000000001')
    expect(parseUDTAmount('100000001', '11')).toBe('0.00100000001')
    expect(parseUDTAmount('112345678901', '14')).toBe('0.00112345678901')
    expect(parseUDTAmount('112345678901234567890123', '24')).toBe('0.11234567890123456789...')
  })
})
