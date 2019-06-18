import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} navigate={props.navigation.navigate} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;