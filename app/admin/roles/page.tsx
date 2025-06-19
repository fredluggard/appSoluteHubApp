"use client";

import { Box, Flex, Select, Stack } from "@mantine/core";
import React, { useMemo, useState } from "react";
import styles from "./roles.module.css";
import Header from "@/components/pageHeader";
import RoleSearch from "@/components/searchComp/roleSearch";
import Image from "next/image";

const Roles = () => {
  const [roles, setRoles] = useState<any>([
    {
      id: 1,
      email: "sochima@admin",
      status: "Active",
      author: "Sochima Onah",
      role: "Admin",
      img: "/images/post1.png",
    },
    {
      id: 2,
      email: "joy@admin",
      status: "Active",
      author: "Joy Amuche",
      role: "Contributor",
      img: "/images/post1.png",
    },
    {
      id: 3,
      email: "solomon@admin",
      status: "Active",
      author: "Solomon Ali",
      role: "Admin",
      img: "/images/post1.png",
    },
    {
      id: 4,
      email: "fred@admin",
      status: "Active",
      author: "Fred Aniebonam",
      role: "Contributor",
      img: "/images/post1.png",
    },
  ]);

  const [popUp, setPopup] = useState(false);
  const handleNew = () => {
    setPopup(true);
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  interface Role {
    id: number;
    email: string;
    status: string;
    author: string;
    role: string;
    img: string;
  }

  const allIds = useMemo<string[]>(
    () => roles?.map((post: Role) => String(post.id)) || [],
    [roles]
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

  const rows = roles?.map((post: Role) => (
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
            src={post.img}
            alt="author"
            width={50}
            height={50}
            className={styles.authorImg}
          />
          <Stack gap={0} className={styles.authorStack}>
            <span className={styles.authorName}>{post.author}</span>
            <span className={styles.role}>{post.role}</span>
          </Stack>
        </Flex>
      </td>
      <td className={styles.rowTitle}>{post.role}</td>
      <td className={styles.rowTitle}>{post.email}</td>
      <td className={styles.rowTitle}>{post.status}</td>
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
  const [status, setStatus] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleCreate = () => {
    if (fullName && email && status && userRole) {
      setRoles((prev: Role[]) => [
        ...prev,
        {
          id: prev.length + 1,
          email,
          status,
          author: fullName,
          role: userRole,
          img: image,
        },
      ]);
      setFullName("");
      setEmail("");
      setStatus("");
      setUserRole("");
      setPopup(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState<any>(null);
  const handleEdit = (id: any) => {
    setEdit(true);
    const roleToEdit = roles.find((role: Role) => role.id === id);
    if (roleToEdit) {
      setFullName(roleToEdit.author);
      setEmail(roleToEdit.email);
      setStatus(roleToEdit.status);
      setUserRole(roleToEdit.role);
      setImage(roleToEdit.img);
      setIdEdit(id);
    }
  };

  const updateRole = (id: any) => {
    const roleIndex = roles.findIndex((role: Role) => role.id === id);
    if (roleIndex !== -1) {
      const updatedRoles = [...roles];
      updatedRoles[roleIndex] = {
        ...updatedRoles[roleIndex],
        email,
        status,
        author: fullName,
        role: userRole,
        img: image,
      };
      setRoles(updatedRoles);
      setEdit(false);
    } else {
      alert("Role not found.");
    }
  };

  const handleDelete = (id: any) => {
    setRoles((prev: Role[]) => prev.filter((post) => post.id !== id));
  };

  return (
    <Stack>
      <Header title="Roles" />
      <Stack className={styles.bodyBox}>
        <RoleSearch handleNew={handleNew} />

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

export default Roles;
