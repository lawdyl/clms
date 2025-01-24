import './App.scss'
import { useState } from 'react';
import LoginPage from './pages/LoginPage/';
import OrganisationPickerPage from './pages/OrganisationPickerPage/';
import StudentListPage from './pages/StudentListPage/';
import { LoginContext, LoginDetails } from './context/loginContext'
import { OrganisationContext, OrganisationDetails } from './context/organisationContext';

export default () => {
  const [ loginDetails, setLoginDetails ] = useState<LoginDetails>(null);
  const [ organisationDetails, setOrganisationDetails ] = useState<OrganisationDetails>(null);

  return <>
    {
      loginDetails ?
        <LoginContext.Provider value={loginDetails}>
          {
            organisationDetails ?
              <OrganisationContext.Provider value={organisationDetails}>
                <StudentListPage />
              </OrganisationContext.Provider>
            :
            <OrganisationPickerPage onOrganisationSelected={setOrganisationDetails} />
          }
        </LoginContext.Provider>
      :
        <LoginPage onLogin={setLoginDetails} />
    }
  </>
}
