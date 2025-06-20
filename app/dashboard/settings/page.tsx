"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { getCountries } from "@yusifaliyevpro/countries";

const Settings = () => {
  interface User {
    id: string;
    fullName: string;
    email: string;
    gender: string;
    nickName: string;
    phone: string;
    country: string;
    profileImage: string;
    role: string;
  }

  const [loading, setLoading] = useState(false);
  const [activeForm, setActiveForm] = useState(true);
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [user, setUser] = useState<User>({} as User);

  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const notitications = [];

  const handleEdit = () => {
    setActiveForm(!activeForm);
    if (activeForm === false) {
      updateUser();
    }
  };

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/userPage/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${url}/api/v1/userPage/profile/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Error ${response.status}:`, errorMessage);
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }

      const data = await response.json();
      console.log("Profile image updated:", data);

      await fetchData();
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  const updateUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/userPage/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          nickName,
          email,
          gender,
          // profileImage: image,
          phone,
          country,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Error ${response.status}:`, errorMessage);
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }
      const data = await response.json();
      setUser(data.data);
      await fetchData();
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await getCountries({
        independent: true,
        fields: ["name"],
      });
      const countryNames =
        countriesData
          ?.map((c: { name: { common: string } }) => c.name.common)
          ?.sort((a: string, b: string) => a.localeCompare(b)) ?? [];
      setCountries(countryNames);
    };

    fetchCountries();
  }, []);

  return (
    <Stack className={styles.setContainer}>
      {loading ? (
        <Stack className={styles.innerBox} justify="center" align="center">
          <Loader color="blue" size="lg" />
        </Stack>
      ) : user.fullName ? (
        <Stack className={styles.innerBox}>
          <Flex className={styles.userBox}>
            <Stack className={styles.nameBox}>
              <Title
                visibleFrom="md"
                className={styles.userName}
              >{`Welcome, ${user.fullName}`}</Title>
              <Text className={styles.date}>{date}</Text>
            </Stack>

            <Stack className={styles.noticeBox}>
              <Image
                src={"/icons/noticeBell.svg"}
                alt=""
                width={30}
                height={30}
                className={styles.noticeIcon}
              />
              <Text className={styles.noticeNum}>{notitications.length}</Text>
            </Stack>
          </Flex>

          <Flex className={styles.detailStack}>
            <Flex className={styles.userDetails}>
              <Stack className={styles.imageStack}>
                <Image
                  src={image ? image : user?.profileImage}
                  alt="user profile"
                  width={50}
                  height={50}
                  className={styles.userImg}
                />
                <Box
                  bg={"orange"}
                  className={styles.cameraBox}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <Image
                    src={"/icons/camera.svg"}
                    alt=""
                    width={20}
                    height={20}
                    className={styles.cameraIcon}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </Box>
              </Stack>

              <Stack className={styles.detailsBox}>
                <Title className={styles.detailsName}>{user?.fullName}</Title>
                <Text className={styles.detailsEmail}>{user?.email}</Text>
              </Stack>
            </Flex>

            <Button
              visibleFrom="md"
              className={styles.edit}
              onClick={handleEdit}
            >
              {activeForm ? "Edit" : "Save"}
            </Button>
          </Flex>

          {activeForm ? (
            <Stack className={styles.formBox}>
              <Flex className={styles.formFlex}>
                <TextInput
                  disabled
                  label="Full Name"
                  placeholder="Sochima Onah"
                  value={user.fullName}
                  className={styles.formInput}
                />
                <TextInput
                  disabled
                  label="Nick Name"
                  placeholder="Sochima"
                  value={user.nickName ?? ""}
                  className={styles.formInput}
                />
              </Flex>

              <Flex className={styles.formFlex}>
                <TextInput
                  type="email"
                  disabled
                  label="Email"
                  placeholder="sochimaonah@gmail.com"
                  value={user.email}
                  className={styles.formInput}
                />
                <TextInput
                  type="number"
                  disabled
                  label="Phone Number"
                  placeholder="0816581xxxx"
                  value={user.phone}
                  className={styles.formInput}
                />
              </Flex>

              <Flex className={styles.formFlex}>
                <Input.Wrapper label="Gender" className={styles.formInput}>
                  <Input
                    component="select"
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    pointer
                    mt="md"
                    disabled
                    value={user.gender}
                    onChange={(e) => setGender(e.currentTarget.value)}
                  >
                    <option value="">{user.gender}</option>
                    <option value="2">Male</option>
                    <option value="3">Female</option>
                  </Input>
                </Input.Wrapper>
                <Input.Wrapper label="Country" className={styles.formInput}>
                  <Input
                    component="select"
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    pointer
                    mt="md"
                    disabled
                    value={user.country}
                    onChange={(e) => setCountry(e.currentTarget.value)}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {user.country}
                      </option>
                    ))}
                  </Input>
                </Input.Wrapper>
              </Flex>
            </Stack>
          ) : (
            <Stack className={styles.formBox}>
              <Flex className={styles.formFlex}>
                <TextInput
                  label="Full Name"
                  placeholder="Sochima Onah"
                  value={fullName}
                  onChange={(e) => setFullName(e.currentTarget.value)}
                  className={styles.formInput}
                />
                <TextInput
                  label="Nick Name"
                  placeholder="Sochima"
                  value={nickName}
                  onChange={(e) => setNickName(e.currentTarget.value)}
                  className={styles.formInput}
                />
              </Flex>

              <Flex className={styles.formFlex}>
                <TextInput
                  type="email"
                  label="Email"
                  placeholder="sochimaonah@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  className={styles.formInput}
                />
                <TextInput
                  type="number"
                  label="Phone Number"
                  placeholder="0816581xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  className={styles.formInput}
                />
              </Flex>

              <Flex className={styles.formFlex}>
                <Input.Wrapper label="Gender" className={styles.formInput}>
                  <Input
                    component="select"
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    pointer
                    mt="md"
                    value={gender}
                    onChange={(e) => setGender(e.currentTarget.value)}
                  >
                    <option value="1"></option>
                    <option value="2">Male</option>
                    <option value="3">Female</option>
                  </Input>
                </Input.Wrapper>
                <Input.Wrapper label="Country" className={styles.formInput}>
                  <Input
                    component="select"
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    pointer
                    mt="md"
                    value={country}
                    onChange={(e) => setCountry(e.currentTarget.value)}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </Input>
                </Input.Wrapper>
              </Flex>
            </Stack>
          )}
          <Button hiddenFrom="md" className={styles.edit} onClick={handleEdit}>
            {activeForm ? "Edit" : "Save"}
          </Button>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default Settings;
