import { useContext } from 'react';
import { OrganisationDetails } from '../../context/organisationContext';
import { LoginContext } from '../../context/loginContext';
import { useListOrganisations } from '../../hooks/dataHooks';
import './index.scss';

type OrganisationPickerPageProps = {
  onOrganisationSelected: (organisationDetails: OrganisationDetails) => void;
};

export default ({onOrganisationSelected}: OrganisationPickerPageProps) => {
  const loginDetails = useContext(LoginContext);
  const [ organisations, loading, _error ] = useListOrganisations(loginDetails.email);

  return (
    <div id="organisation-picker-page">
      <div id="organisation-picker-container">
        <div id="welcome-message">
          Welcome {loginDetails.email}. Please select an organisation:
        </div>
        <ul id="organisation-list">
          {
            loading ? "Loading..." : organisations.map((organisation) => (
              <li key={organisation.id}>
                <a onClick={() => {onOrganisationSelected({
                  id: organisation.id,
                  displayName: organisation.displayName
                })}}>
                  <div className="organisation-image">
                    (image here)
                  </div>
                  <div className="organisation-name">
                    {organisation.displayName}
                  </div>
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}