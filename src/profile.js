import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import {
  updateTeamMemberDetails,
  moveTeamMember,
} from "./redux/features/employees";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = useSelector((state) => state.employees.data);
  const teamId = useSelector((state) => state.employees.teamId);
  const teamMemberId = useSelector((state) => state.employees.teamMemberId);
  const deptId = useSelector((state) => state.employees.deptId);

  console.log({ teamId }, { deptId });

  const [memberDetails, setMemberDetails] = useState({});

  useEffect(() => {
    const findAndSetTeamMembers = () => {
      for (const department of data.company.departments) {
        for (const subDepartment of department.subDepartments) {
          if (subDepartment.id === teamId && subDepartment.teamMembers) {
            const member = subDepartment.teamMembers.find(
              (m) => m.id === teamMemberId
            );

            if (member) {
              setMemberDetails(member);
              return;
            }
          }
        }
      }
    };
    findAndSetTeamMembers();
  }, [data]);

  const [isEditing, setIsEditing] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(memberDetails.phoneNumber);
  const [email, setEmail] = useState(memberDetails.mailId);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setPhoneNumber(memberDetails.phoneNumber);
    setEmail(memberDetails.mailId);
  }, [memberDetails]);

  const handleSavePress = () => {
    setIsEditing(false);
    dispatch(
      updateTeamMemberDetails({
        teamId,
        deptId,
        memberId: memberDetails.id,
        newMailId: email,
        newPhoneNumber: phoneNumber,
      })
    );
  };

  const handleMove = () => {
    dispatch(moveTeamMember({ teamId, deptId, memberId: memberDetails.id }));
    navigation.navigate("Team");
  };

  const svgUrl =
    "https://media.assettype.com/fortuneindia/2022-12/0599e252-e61e-4aa3-be86-54e4761e48f2/Sundar_Pichai_02064_copy.jpg?w=1200&h=675";
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
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
        <Text> {memberDetails.name}</Text>
        <Text> {memberDetails.role}</Text>
      </View>
      <View
        style={{
          marginHorizontal: 5,
          borderLeftColor: "#23e865",

          borderLeftWidth: 3,
          borderRadius: 4,
          borderWidth: 2,
          borderTopColor: "#e1e3e1",
          borderBottomColor: "#e1e3e1",
          borderRightColor: "#e1e3e1",
        }}
      >
        <View style={{ marginHorizontal: 5 }}>
          <Pressable>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  flexDirection: "row",

                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#494c4c",
                    fontWeight: "bold",
                    width: 150,
                  }}
                >
                  ID:
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#b5b3b3", fontWeight: "bold" }}
                >
                  {memberDetails.id}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
        <View>
          <View style={{ borderTopWidth: 0.5, borderTopColor: "#b5b3b3" }}>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#494c4c",
                    fontWeight: "bold",
                    width: 150,
                  }}
                >
                  Phone Number:
                </Text>
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: 12,
                      color: "#b5b3b3",
                      fontWeight: "bold",
                    }}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#b5b3b3",
                      fontWeight: "bold",
                    }}
                  >
                    {phoneNumber}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={{ borderTopWidth: 0.5, borderTopColor: "#b5b3b3" }}>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#494c4c",
                    fontWeight: "bold",
                    width: 150,
                  }}
                >
                  Email ID:
                </Text>
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: 12,
                      color: "#b5b3b3",
                      fontWeight: "bold",
                    }}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#b5b3b3",
                      fontWeight: "bold",
                    }}
                  >
                    {email}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <Pressable
          onPress={() => handleEditPress()}
          style={{
            backgroundColor: "#2165b8",
            width: 80,
            alignItems: "center",
            paddingVertical: 3,
            borderRadius: 3,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Edit</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={{
              backgroundColor: "#2165b8",
              width: 80,
              alignItems: "center",
              paddingVertical: 3,
              borderRadius: 3,
            }}
            onPress={handleSavePress}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Save</Text>
          </Pressable>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <Pressable
          onPress={() => handleMove()}
          style={{
            backgroundColor: "#2165b8",
            paddingHorizontal: 6,
            alignItems: "center",
            paddingVertical: 3,
            borderRadius: 3,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Move to other team
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
