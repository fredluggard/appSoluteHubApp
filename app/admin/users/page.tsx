"use client";

import { Box, Flex, Select, Stack } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./users.module.css";
import Header from "@/components/pageHeader";
import Image from "next/image";
import UserSearch from "@/components/searchComp/userSearch";
import { useSelector } from "react-redux";
import { getUserToken } from "@/store/userSlice";

interface User {
  id: string;
  fullName: string;
  email: string;
  profileImage?: string;
  role?: string;
  status?: string;
  country?: string | null;
  gender?: string | null;
  nickName?: string | null;
  phone?: string | null;
  verified?: boolean | null;
  answered?: number | null;
  totalScore?: number | null;
  resetToken?: string | number | null;
  resetTokenExpires?: string | number | null;
}
// interface UserData {
//   currentPage?: string | number;
//   totalPages: string;
//   totalUsers: string;
//   user: User[];
// }

const Users = () => {
  const [userProfile, setUserProfile] = useState<User[]>([]);

  const [popUp, setPopup] = useState(false);
  const handleNew = () => {
    setPopup(true);
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allIds = useMemo<string[]>(
    () => userProfile?.map((post: User) => String(post.id)) || [],
    [userProfile]
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(allIds); // select all
    } else {
      setSelectedIds([]); // unselect all
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rows = userProfile?.map((post: User) => (
    <tr key={post.id} className={styles.tableRow}>
      <th className={styles.headCheck}>
        <input
          type="checkbox"
          className={styles.headCheckBox}
          checked={selectedIds.includes(String(post.id))}
          onChange={() => handleSelectOne(String(post.id))}
        />
      </th>
      <td className={styles.headAuthor}>
        <Flex className={styles.authorRow}>
          <Image
            src={post.profileImage || "/icons/user.svg"}
            alt="author"
            width={50}
            height={50}
            className={styles.authorImg}
          />
          <Stack gap={0} className={styles.authorStack}>
            <span className={styles.authorName}>{post.fullName}</span>
            <span className={styles.role}>{post.role}</span>
          </Stack>
        </Flex>
      </td>
      <td className={styles.rowTitle}>{post.role}</td>
      <td className={styles.rowTitle}>{post.email}</td>
      <td className={styles.rowTitle}>{post.status ?? "N/A"}</td>
      <td className={styles.headActions}>
        <Flex className={styles.actionRow}>
          <Image
            src={"/icons/pen.svg"}
            alt=""
            width={20}
            height={20}
            className={styles.iconImg}
            onClick={() => handleEdit(post.id)}
          />
          <Image
            src={"/icons/bin.svg"}
            alt=""
            width={20}
            height={20}
            className={styles.iconImg}
            onClick={() => handleDelete(post.id)}
          />
        </Flex>
      </td>
    </tr>
  ));

  const [fullName, setFullName] = useState("");
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [userRole, setUserRole] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = useSelector(getUserToken);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/userPage`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Fetched users:", data);
      setUserProfile(data.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleCreate = () => {
    // if (fullName && email && status && userRole) {
    //   setUserProfile((prev: User[]) => [
    //     ...prev,
    //     {
    //       id: (prev.length + 1).toString(),
    //       email,
    //       fullName,
    //       profileImage: image,
    //       role: userRole,
    //       status,
    //       country: null,
    //       gender: null,
    //       nickName: null,
    //       phone: null,
    //       verified: null,
    //       answered: null,
    //       totalScore: null,
    //       resetToken: null,
    //       resetTokenExpires: null,
    //     },
    //   ]);
    //   setFullName("");
    //   setEmail("");
    //   setStatus("");
    //   setUserRole("");
    //   setPopup(false);
    // } else {
    //   alert("Please fill in all fields.");
    // }
  };

  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState<any>(null);
  const handleEdit = async (id: any) => {
    setEdit(true);

    try {
      const res = await fetch(`${baseUrl}/api/v1/userPage/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Fetched user:", data);
      setFullName(data.data.fullName);
      setEmail(data.data.email);
      setStatus("N/A");
      setUserRole(data.data.role || "");
      setImage(data.data.profileImage || "");
      setIdEdit(id);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const updateProfile = async (id: string) => {
    const formData = new FormData();
    formData.append("file", imageFile as Blob);
    try {
      const res = await fetch(`${baseUrl}/api/v1/userPage/profile/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      console.log("User profile updated:", data);
      // setUserProfile(data.data.users);
    } catch (err) {
      console.error("Failed to update user profile:", err);
    }
  };

  const updateUserRole = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/userPage/role/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          email,
          role: userRole,
        }),
      });
      const data = await res.json();
      console.log("User Role updated:", data);
    } catch (err) {
      console.error("Failed to update user role:", err);
    }
  };

  const updateRole = async (id: any) => {
    if (imageFile) {
      await updateProfile(id);
    }
    await updateUserRole(id);
    fetchUsers();
    setEdit(false);
    setFullName("");
    setEmail("");
    setStatus("");
    setUserRole("");
    setImage("");
  };

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/userPage/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
    } finally {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Stack>
      <Header title="Users" />
      <Stack className={styles.bodyBox}>
        <UserSearch handleNew={handleNew} />

        <table>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.headCheck}>
                <input
                  type="checkbox"
                  className={styles.headCheckBox}
                  checked={
                    selectedIds.length === allIds.length && allIds.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className={styles.headAuthor}>User Name</th>
              <th className={styles.headAuthor}>Assigned Role</th>
              <th className={styles.headTitle}>Email</th>
              <th className={styles.headAuthor}>Status</th>
              <th className={styles.headActions}>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </Stack>

      {popUp && (
        <Stack className={styles.popUp} onClick={() => setPopup(false)}>
          <Stack
            className={styles.popUpBox}
            onClick={(e) => e.stopPropagation()}
          >
            <Stack justify="center" align="center" gap={0}>
              <Box className={styles.profileBox}>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(URL.createObjectURL(file));
                      setImageFile(file);
                    }
                  }}
                  className={styles.profileInput}
                />
                <Image
                  src={"/icons/cameraFill.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className={styles.camera}
                />
                {image && (
                  <Image
                    src={image}
                    alt=""
                    width={75}
                    height={75}
                    className={styles.dpImg}
                  />
                )}
              </Box>
            </Stack>
            <Stack w="100%" align="start" gap={0}>
              <label htmlFor="name" className={styles.popUpLabel}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                className={styles.popUpInput}
                value={fullName}
                onChange={handleFullNameChange}
              />
            </Stack>
            <Stack w="100%" align="start" gap={0}>
              <label htmlFor="name" className={styles.popUpLabel}>
                Email
              </label>
              <input
                id="name"
                type="text"
                placeholder="Email"
                className={styles.popUpInput}
                value={email}
                onChange={handleEmailChange}
              />
            </Stack>
            <Flex w="100%" justify="space-between">
              <Select
                label="Status"
                placeholder="Disabled"
                data={["Active", "Inactive"]}
                value={status}
                onChange={(value) => setStatus(value || "")}
                radius="xl"
                className={styles.selector}
              />
              <Select
                label="Role"
                placeholder="Pick Role"
                data={["Admin", "Contributor", "Editor", "Viewer"]}
                value={userRole}
                onChange={(value) => setUserRole(value || "")}
                radius="xl"
                className={styles.selector}
              />
            </Flex>
            <button className={styles.addNew} onClick={handleCreate}>
              Create
            </button>
          </Stack>
        </Stack>
      )}

      {/* To Edit a Role */}
      {edit && (
        <Stack className={styles.popUp} onClick={() => setEdit(false)}>
          <Stack
            className={styles.popUpBox}
            onClick={(e) => e.stopPropagation()}
          >
            <Stack justify="center" align="center" gap={0}>
              <Box className={styles.profileBox}>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(URL.createObjectURL(file));
                      setImageFile(file);
                    }
                  }}
                  className={styles.profileInput}
                />
                <Image
                  src={"/icons/cameraFill.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className={styles.camera}
                />
                {image && (
                  <Image
                    src={image}
                    alt=""
                    width={75}
                    height={75}
                    className={styles.dpImg}
                  />
                )}
              </Box>
            </Stack>
            <Stack w="100%" align="start" gap={0}>
              <label htmlFor="name" className={styles.popUpLabel}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                className={styles.popUpInput}
                value={fullName}
                onChange={handleFullNameChange}
              />
            </Stack>
            <Stack w="100%" align="start" gap={0}>
              <label htmlFor="name" className={styles.popUpLabel}>
                Email
              </label>
              <input
                id="name"
                type="text"
                placeholder="Email"
                className={styles.popUpInput}
                value={email}
                onChange={handleEmailChange}
              />
            </Stack>
            <Flex w="100%" justify="space-between">
              <Select
                label="Status"
                placeholder="Disabled"
                data={["Active", "Inactive"]}
                value={status}
                onChange={(value) => setStatus(value || "")}
                radius="xl"
                className={styles.selector}
              />
              <Select
                label="Role"
                placeholder="Pick Role"
                data={["Admin", "Contributor", "Editor", "Viewer"]}
                value={userRole}
                onChange={(value) => setUserRole(value || "")}
                radius="xl"
                className={styles.selector}
              />
            </Flex>
            <button
              className={styles.addNew}
              onClick={() => updateRole(idEdit)}
            >
              Done
            </button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Users;
