import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTeamMemberId,
  makeTeamLeader,
  addTeamMembers,
} from "./redux/features/employees";

const Team = () => {
  const [open, setOpen] = useState(-1);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.employees.data);
  const teamId = useSelector((state) => state.employees.teamId);
  const deptId = useSelector((state) => state.employees.deptId);

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const findAndSetTeamMembers = () => {
      for (const department of data.company.departments) {
        for (const subDepartment of department.subDepartments) {
          if (subDepartment.id === teamId && subDepartment.teamMembers) {
            setTeamMembers(subDepartment.teamMembers);
            return;
          }
        }
      }

      setTeamMembers([]);
    };
    findAndSetTeamMembers();
  }, [data]);

  const toggleOpen = (memberId) => {
    setOpen((prevOpen) => (prevOpen === memberId ? null : memberId));
  };

  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberMobile, setNewMemberMobile] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addTeamMember = () => {
    if (!newMemberName || !newMemberMobile || !newMemberEmail) {
      alert("All fields are required. Please fill in all the details.");
      return;
    }
    const newMember = {
      id: teamMembers.length + 1,
      name: newMemberName,
      role: "Team Member",
    };

    if (teamMembers.some((member) => member.name === newMemberName)) {
      alert(
        "Member with the same name already exists. Please choose a different name."
      );
      return;
    }

    dispatch(
      addTeamMembers({
        departmentId: deptId,
        subDepartmentId: teamId,
        newTeamMember: {
          id: teamMembers.length + 1,
          name: newMemberName,
          role: "Team Member",
          phoneNumber: newMemberMobile,
          mailId: newMemberEmail,
        },
      })
    );

    setAddModalVisible(false);
    setNewMemberName("");
    setNewMemberMobile("");
    setNewMemberEmail("");
  };
  const closeModal = () => {
    setAddModalVisible(false);
  };

  const removeTeamMember = (memberId) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
  };

  const makeTeamLeaderHandler = (memberId) => {
    dispatch(
      makeTeamLeader({
        departmentId: deptId,
        subDepartmentId: teamId,
        memberId: memberId,
      })
    );
  };

  const teamLeaders = teamMembers.filter(
    (member) => member.role === "Team Leader"
  );
  const teamMembersList = teamMembers.filter(
    (member) => member.role === "Team Member"
  );

  const profileViewHandler = (id) => {
    navigation.navigate("Profile");
    dispatch(setTeamMemberId(id));
  };

  const filteredTeamMembers = teamMembersList.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userNameHandler = (text) => {
    setNewMemberName(text);
  };
  const mobileNumberHandler = (text) => {
    setNewMemberMobile(text);
  };

  const svgUrl =
    "https://media.assettype.com/fortuneindia/2022-12/0599e252-e61e-4aa3-be86-54e4761e48f2/Sundar_Pichai_02064_copy.jpg?w=1200&h=675";
  return (
    <ScrollView style={{ flex: 1, gap: 5 }}>
      <TextInput
        placeholder="Search by Name"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {teamLeaders.map((member, i) => (
        <View style={{ alignItems: "center" }} key={i}>
          <View style={{}}>
            <Image
              style={{
                width: 85,
                height: 90,
                borderRadius: 50,
              }}
              source={{
                uri: svgUrl,
              }}
            />
          </View>
          <Text> {member.name}</Text>
          <Text> {member.role}</Text>
        </View>
      ))}
      {filteredTeamMembers.map((member, i) => (
        <View key={member.id}>
          <View style={{ marginHorizontal: 5 }}>
            <Pressable
              onPress={() => {
                toggleOpen(member.id);
              }}
              style={{
                borderLeftColor: "#23e865",

                borderLeftWidth: 3,
                borderRadius: 4,
                borderWidth: 2,
                borderTopColor: "#e1e3e1",
                borderBottomColor: "#e1e3e1",
                borderRightColor: "#e1e3e1",
              }}
            >
              <View style={{ flexDirection: "row", padding: 5 }}>
                <View>
                  <Image
                    style={{
                      width: 35,
                      height: 40,
                    }}
                    source={{
                      uri: svgUrl,
                    }}
                  />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#494c4c",
                      fontWeight: "bold",
                    }}
                  >
                    {member.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#b5b3b3",
                      fontWeight: "bold",
                    }}
                  >
                    {member.role}
                  </Text>
                </View>
              </View>
            </Pressable>
            {open == member.id && (
              <View style={{ paddingVertical: 10, marginHorizontal: 30 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable
                    onPress={() => removeTeamMember(member.id)}
                    style={{
                      backgroundColor: "#2165b8",

                      alignItems: "center",
                      paddingVertical: 3,
                      borderRadius: 3,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: 400 }}>
                      Remove
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setTimeout(() => {
                        makeTeamLeaderHandler(member.id);
                      }, 1000);
                    }}
                    style={{
                      backgroundColor: "#2165b8",

                      alignItems: "center",
                      paddingVertical: 3,
                      borderRadius: 3,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: 400 }}>
                      Set as Team Leader
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => profileViewHandler(member.id)}
                    style={{
                      backgroundColor: "#2165b8",

                      alignItems: "center",
                      paddingVertical: 3,
                      borderRadius: 3,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: 400 }}>
                      Profile View
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      ))}

      <Modal
        visible={isAddModalVisible}
        animationType={"fade"}
        transparent={true}
      >
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            marginHorizontal: 20,
            alignItems: "center",
            top: 100,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Details of person
              </Text>
              <Pressable
                onPress={() => {
                  closeModal();
                }}
              >
                <Text style={{ fontWeight: "bold", padding: 5 }}>X</Text>
              </Pressable>
            </View>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={newMemberName}
              onChangeText={(text) => userNameHandler(text)}
            />
            <TextInput
              placeholder="Mobile Number"
              style={styles.input}
              value={newMemberMobile}
              onChangeText={(text) => mobileNumberHandler(text)}
            />
            <TextInput
              placeholder="Email ID"
              style={styles.input}
              value={newMemberEmail}
              onChangeText={(text) => setNewMemberEmail(text)}
            />
            <Button title="Add Team Member" onPress={addTeamMember} />
          </View>
        </View>
      </Modal>

      <Pressable
        onPress={() => setAddModalVisible(true)}
        style={{
          width: 180,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "#2165b8",
            color: "#fff",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          Add Team Member
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Team;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingVertical: 8,
  },
  searchInput: {
    borderBottomWidth: 1,
    borderColor: "#2165b8",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
});
