import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setTeamId, setDeptId } from "./redux/features/employees";

import React, { useState } from "react";

const DashBoard = () => {
  const data = useSelector((state) => state.employees.data);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const navigation = useNavigation();

  const toggleOpen = (memberId) => {
    setOpen((prevOpen) => (prevOpen === memberId ? null : memberId));
  };

  const handleNavigation = (id) => {
    navigation.navigate("Team");
    dispatch(setTeamId(id));
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
        <Text>{data.company.ceo}</Text>
        <Text>CEO</Text>
      </View>
      <ScrollView style={{ flex: 1, gap: 5 }}>
        {data.company.departments.map((item, i) => (
          <View style={{ marginHorizontal: 5, marginVertical: 5 }} key={i}>
            <Pressable
              onPress={() => {
                toggleOpen(item.id), dispatch(setDeptId(item.id));
              }}
              style={{
                borderLeftColor: "#23e865",
                borderRightColor: "#23e865",

                borderLeftWidth: 3,
                borderRightWidth: 3,
                borderRadius: 4,
                borderWidth: 2,
                borderTopColor: "#e1e3e1",
                borderBottomColor: "#e1e3e1",
              }}
            >
              <View
                style={{
                  backgroundColor: "#e1fae9",
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#23e865",
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#494c4c",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Text>
              </View>
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
                    {item.headName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#b5b3b3",
                      fontWeight: "bold",
                    }}
                  >
                    {item.role}
                  </Text>
                </View>
              </View>
            </Pressable>
            {open == item.id && (
              <View
                style={{
                  paddingVertical: 10,
                  borderLeftWidth: 3,
                  marginLeft: 30,
                }}
              >
                {item.subDepartments.map((items, i) => {
                  var teamLeaders = "";
                  if (items && items.teamMembers) {
                    teamLeaders = items.teamMembers.filter(
                      (member) => member.role === "Team Leader"
                    );
                  }

                  return (
                    <Pressable
                      onPress={() => {
                        handleNavigation(items.id);
                      }}
                      style={{
                        borderLeftColor: "#fc6d60",
                        borderLeftWidth: 3,
                        marginLeft: 15,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderTopColor: "#e1e3e1",
                        borderBottomColor: "#e1e3e1",
                        borderRightColor: "#e1e3e1",
                      }}
                      key={i}
                    >
                      <View
                        style={{
                          backgroundColor: "#f5dad7",
                          borderBottomWidth: 0.5,
                          borderBottomColor: "#fc6d609",
                          padding: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            color: "#494c4c",
                            fontWeight: "bold",
                          }}
                        >
                          {items.name}
                        </Text>
                      </View>
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
                            {teamLeaders.length > 0
                              ? teamLeaders
                                  .map((member) => member.name)
                                  .join(", ")
                              : ""}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#b5b3b3",
                              fontWeight: "bold",
                            }}
                          >
                            Team Leader
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({});
