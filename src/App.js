import { Provider } from "react-redux"

import { AppRouter } from "./routers/AppRouter";
import { store } from "./redux/store/store";


import "./scss/styles.scss";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
