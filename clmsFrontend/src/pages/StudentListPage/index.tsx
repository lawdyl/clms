import { useContext, useState } from 'react';
import Header from '../../components/Header/';
import { useListCohorts, useListStudents } from '../../hooks/dataHooks';
import { OrganisationContext } from '../../context/organisationContext';
import './index.scss';

export default () => {
  return (
    <div id="student-list-page">
      <Header />
      <Filters />
      <CohortList />
    </div>
  );
}

const Filters = () => {
  return (
    <div id="filters">
      TODO: table header with filters, sorting etc.
    </div>
  );
}

const CohortList = () => {
  const organisationDetails = useContext(OrganisationContext);
  const [ cohorts, loading, _error ] = useListCohorts(organisationDetails.id);

  return (
    <div id="cohort-list">
      {loading ? "loading..." : cohorts.map(
        (cohort) => <StudentList key={cohort.id} cohort={cohort} />
      )}
    </div>
  );
};

const orderStudents = (student1, student2) => {
  return student1.statusCode - student2.statusCode;
}

const StudentList = ({cohort}) => {
  const organisationDetails = useContext(OrganisationContext);
  const [ students, loading, _error ] = useListStudents(organisationDetails.id, cohort.id);
  const [ expanded, setExpanded ] = useState(true);

  return (
    <div className="cohort-container">
      <a className={expanded ? "cohort-parent expanded" : "cohort-parent"} onClick={() => setExpanded(!expanded)}>
        {cohort.displayName}:
      </a>
      <div className={expanded ? "student-list expanded" : "student-list"}>
        {loading ? "Loading..." : students.sort(orderStudents).map(
          (student) => <StudentRow key={student.id} student={student} />
        )}
      </div>
    </div>
  );
};

const StudentRow = ({student}) => {
  let statusClass;
  if (student.statusCode === 0) {
    statusClass = "not-assessed";
  } else if (student.statusCode === 1) {
    statusClass = "clear";
  } else if (student.statusCode === 2) {
    statusClass = "moderate";
  } else if (student.statusCode === 3) {
    statusClass = "severe";
  }

  return (
    <div className={`${statusClass} student-row`}>
      <div className="student-id">
        {student.id}
      </div>
      <div className="student-name">
        {student.firstName} {student.secondName}
      </div>
      <div className="student-status">
        {student.statusDisplayName}
      </div>
      <div className="student-link" onClick={() => alert("Not implemented")}>
        ↗ Open Case
      </div>
    </div>
  );
}