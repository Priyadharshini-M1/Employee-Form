import React, { useEffect, useState, useCallback, useRef } from 'react';
import './EmployeeTable.css'

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployeesRef = useRef(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }, []);

  useEffect(() => {
    fetchEmployeesRef.current = fetchEmployees;
    fetchEmployeesRef.current();
  }, [fetchEmployees]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = useCallback(async (id) => {
    try {
      await fetch(`http://localhost:5000/employees/${id}`, {
        method: 'DELETE',
      });
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }, [employees]);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-table-container">
      <input
        type="text"
        placeholder="Search employee..."
        onChange={handleSearchChange}
        className="search-input"
      />
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Employee ID</th>
            <th>Salary</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Address</th>
            <th>Blood Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.date_of_birth}</td>
              <td>{employee.employee_id}</td>
              <td>{employee.salary}</td>
              <td>{employee.gender}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.address}</td>
              <td>{employee.blood_group}</td>
              <td>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;