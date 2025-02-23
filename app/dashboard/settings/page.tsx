"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import Image from "next/image";

const Settings = () => {
  const [activeForm, setActiveForm] = useState(true);
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);

  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const notitications = [1, 2];

  const handleEdit = () => {
    setActiveForm(!activeForm);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames: string[] = data.map(
          (country: { name: { common: string } }) => country.name.common
        );
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  });

  return (
    <Stack className={styles.setContainer}>
      <Stack className={styles.innerBox}>
        <Flex className={styles.userBox}>
          <Stack className={styles.nameBox}>
            <Title className={styles.userName}>Welcome, Sochima</Title>
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
                src={image || "/images/userProfile.png"}
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
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </Box>
            </Stack>

            <Stack className={styles.detailsBox}>
              <Title className={styles.detailsName}>
                {fullName || "Sochima Onah"}
              </Title>
              <Text className={styles.detailsEmail}>
                {email || "sochima@gmail.com"}
              </Text>
            </Stack>
          </Flex>

          <Button className={styles.edit} onClick={handleEdit}>
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
                value={fullName}
                onChange={(e) => setFullName(e.currentTarget.value)}
                className={styles.formInput}
              />
              <TextInput
                disabled
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
                disabled
                label="Email"
                placeholder="sochimaonah@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                className={styles.formInput}
              />
              <TextInput
                type="number"
                disabled
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
                  disabled
                  value={gender}
                  onChange={(e) => setGender(e.currentTarget.value)}
                >
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </Input>
              </Input.Wrapper>
              <Input.Wrapper label="Country" className={styles.formInput}>
                <Input
                  component="select"
                  rightSection={<IconChevronDown size={14} stroke={1.5} />}
                  pointer
                  mt="md"
                  disabled
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
      </Stack>
    </Stack>
  );
};

export default Settings;
