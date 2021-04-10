jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValueOnce(''),
    show: jest.fn().mockResolvedValueOnce(''),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

export {};
