import { StyleSheet } from 'react-native';
import variables from '../assets/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variables.colors.blue.tint,
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 40,
    marginLeft: 16,
    fontFamily: variables.fonts.bold,
    fontSize: 36,
    color: variables.colors.purple.normal,
  },
  subTitle: {
    marginTop: 16,
    marginLeft: 16,
    fontFamily: variables.fonts.bold,
    fontSize: 22,
    color: variables.colors.white,
  },
  inputsContainer: {
    justifyContent: 'center',
    marginLeft: 36,
    marginRight: 36,
  },
  buttonAdditionalStyles: {
    marginLeft: 67,
    marginRight: 67,
    marginBottom: 16,
    marginTop: 32,
  },
  footerText: {
    marginBottom: 35,
    marginLeft: 32,
    marginRight: 32,
    textAlign: 'center',
    color: variables.colors.white,
    fontFamily: variables.fonts.regular,
  },
  footerLink: {
    color: variables.colors.blue.normal,
    textDecorationLine: 'underline',
  },
});
