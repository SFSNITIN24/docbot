export interface TagTheme {
  backgroundColor: string;
  color: string;
  name: string;
}

export const tagThemes: TagTheme[] = [
  {
    name: 'green',
    backgroundColor: '#FAFFDE',
    color: '#5EB85C'
  },
  {
    name: 'yellow',
    backgroundColor: '#FAFFDE', 
    color: '#FFC023'
  },
  {
    name: 'red',
    backgroundColor: '#FFDEDE',
    color: '#FF4D4D'
  }
];

export const getTagTheme = (themeName: string): TagTheme | undefined => {
  return tagThemes.find(theme => theme.name === themeName);
};

export const getTagThemeByIndex = (index: number): TagTheme => {
  return tagThemes[index % tagThemes.length];
};

export const tagStyles = {
  green: {
    backgroundColor: '#FAFFDE',
    color: '#5EB85C'
  },
  yellow: {
    backgroundColor: '#FAFFDE',
    color: '#FFC023'
  },
  red: {
    backgroundColor: '#FFDEDE',
    color: '#FF4D4D'
  }
};

export default tagThemes;
