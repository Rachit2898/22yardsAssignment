import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialState = { data: data, teamId: "", teamMemberId: "", deptId: "" };

const empSlice = createSlice({
  name: "emp",
  initialState,
  reducers: {
    setTeamId: (state, action) => {
      state.teamId = action.payload;
    },
    setTeamMemberId: (state, action) => {
      state.teamMemberId = action.payload;
    },
    setDeptId: (state, action) => {
      state.deptId = action.payload;
    },
    updateTeamMemberDetails: (state, action) => {
      const { teamId, deptId, memberId, newMailId, newPhoneNumber } =
        action.payload;

      const department = state.data.company.departments.find(
        (dep) => dep.id === deptId
      );

      const subDepartment = department.subDepartments.find(
        (subDep) => subDep.id === teamId
      );

      const teamMember = subDepartment.teamMembers.find(
        (member) => member.id === memberId
      );

      if (teamMember) {
        teamMember.mailId = newMailId;
        teamMember.phoneNumber = newPhoneNumber;
      }
    },
    makeTeamLeader: (state, action) => {
      const { departmentId, subDepartmentId, memberId } = action.payload;

      const department = state.data.company.departments.find(
        (dep) => dep.id === departmentId
      );

      if (department) {
        const subDepartment = department.subDepartments.find(
          (subDep) => subDep.id === subDepartmentId
        );

        if (subDepartment) {
          const teamMember = subDepartment.teamMembers.find(
            (member) => member.id === memberId
          );

          if (teamMember) {
            teamMember.role = "Team Leader";

            subDepartment.teamMembers.forEach((member) => {
              if (member.id !== memberId && member.role === "Team Leader") {
                member.role = "Team Member";
              }
            });
          }
        }
      }
    },
    addTeamMembers: (state, action) => {
      const { departmentId, subDepartmentId, newTeamMember } = action.payload;

      const department = state.data.company.departments.find(
        (dep) => dep.id === departmentId
      );

      if (department) {
        const subDepartment = department.subDepartments.find(
          (subDep) => subDep.id === subDepartmentId
        );

        console.log("redux", newTeamMember.id);

        if (subDepartment) {
          const newTeamMemberWithId = {
            ...newTeamMember,
            id: newTeamMember.id,
          };

          subDepartment.teamMembers = [
            ...subDepartment.teamMembers,
            newTeamMemberWithId,
          ];
        }
      }
    },
    moveTeamMember: (state, action) => {
      const { teamId, deptId, memberId } = action.payload;

      const sourceDepartment = state.data.company.departments.find(
        (dept) => dept.id === deptId
      );
      const sourceTeam = sourceDepartment.subDepartments.find(
        (team) => team.id === teamId
      );

      const remainingTeams = sourceDepartment.subDepartments.filter(
        (team) => team.id !== teamId
      );

      const targetTeam = remainingTeams[0];

      const teamMemberIndex = sourceTeam.teamMembers.findIndex(
        (member) => member.id === memberId
      );
      const teamMember = sourceTeam.teamMembers[teamMemberIndex];

      sourceTeam.teamMembers.splice(teamMemberIndex, 1);

      const targetTeamLength = targetTeam.teamMembers.length;

      const newTeamMemberId = targetTeamLength + 2;

      teamMember.id = newTeamMemberId;

      targetTeam.teamMembers.push(teamMember);

      state.teamId = targetTeam.id;
      state.teamMemberId = newTeamMemberId;
      state.deptId = deptId;
    },
    removeTeamMember: (state, action) => {
      const { teamId, deptId, memberId } = action.payload;

      const department = state.data.company.departments.find(
        (dept) => dept.id === deptId
      );

      const subDepartment = department.subDepartments.find(
        (subDept) => subDept.id === teamId
      );

      const teamMemberIndex = subDepartment.teamMembers.findIndex(
        (member) => member.id === memberId
      );

      if (teamMemberIndex !== -1) {
        subDepartment.teamMembers.splice(teamMemberIndex, 1);
      }
    },
  },
});
export const {
  setTeamId,
  setTeamMemberId,
  updateTeamMemberDetails,
  makeTeamLeader,
  setDeptId,
  addTeamMembers,
  moveTeamMember,
  removeTeamMember,
} = empSlice.actions;
export default empSlice.reducer;
