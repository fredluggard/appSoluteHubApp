"use client";

import { Flex, Stack } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./tags.module.css";
import Header from "@/components/pageHeader";
import TagSearch from "@/components/searchComp/tagSearch";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUserToken } from "@/store/userSlice";
import LoadingBar from "../loading";

interface Tag {
  id: string;
  name: string;
}

const Tags = () => {
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState<Tag[]>([
    {
      id: "1",
      name: "Web Development",
    },
    {
      id: "2",
      name: "Data Science",
    },
    {
      id: "3",
      name: "Machine Learning",
    },
    {
      id: "4",
      name: "Artificial Intelligence",
    },
    {
      id: "5",
      name: "Blockchain",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const [popUp, setPopup] = useState(false);
  const handleNew = () => {
    setPopup(true);
  };

  const [editValue, setEditValue] = useState<Tag>({ id: "", name: "" });
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue((prev) => ({ ...prev, name: e.target.value }));
  };
  const [editTag, setEditTag] = useState(false);
  const handleEdit = (name: string, id: string) => {
    setEditValue({ id, name });
    setEditTag(true);
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allIds = useMemo(() => tag?.map((post) => String(post)) || [], [tag]);

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = useSelector(getUserToken);

  const rows = tag?.map((post, index) => (
    <tr key={index} className={styles.tableRow}>
      <th className={styles.headCheck}>
        <input
          type="checkbox"
          className={styles.headCheckBox}
          checked={selectedIds.includes(String(post))}
          onChange={() => handleSelectOne(String(post))}
        />
      </th>
      <td className={styles.rowTitle}>{post.name}</td>
      <td className={styles.headActions}>
        <Flex className={styles.actionRow}>
          <Image
            src={"/icons/pen.svg"}
            alt=""
            width={20}
            height={20}
            className={styles.iconImg}
            onClick={() => handleEdit(post.name, post.id)}
          />
          <Image
            src={"/icons/bin.svg"}
            alt=""
            width={20}
            height={20}
            className={styles.iconImg}
            onClick={() => handleDeleteTag(post.id)}
          />
        </Flex>
      </td>
    </tr>
  ));

  const fetchTag = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/tags`);
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch tag");
      }

      const data = await response.json();
      console.log("Tags fetched:", data);
      // const list = data.map((tag: { name: string }) => tag.name);
      setTag(data);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (inputValue) {
      try {
        const response = await fetch(`${baseUrl}/api/v1/tags`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: inputValue,
          }),
        });

        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to create tag");
        }

        const data = await response.json();
        console.log("Tag created:", data);
      } catch (error) {
        console.error("Error:", (error as Error).message);
      } finally {
        fetchTag();
        setPopup(false);
        setInputValue("");
      }
    }
  };

  const handleEditTag = async (id: string) => {
    if (editValue.name !== "") {
      try {
        const response = await fetch(`${baseUrl}/api/v1/tags/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editValue.name,
          }),
        });

        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to updated tag");
        }

        const data = await response.json();
        console.log("Tag updated:", data);
        setEditValue({ id: "", name: "" });
      } catch (error) {
        console.error("Error:", (error as Error).message);
      } finally {
        fetchTag();
        setEditTag(false);
      }
    }
  };

  const handleDeleteTag = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/tags/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to delete tag");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
    } finally {
      fetchTag();
    }
  };

  useEffect(() => {
    fetchTag();
  }, []);

  return loading ? (
    <LoadingBar />
  ) : (
    <Stack>
      <Header title="Tags" />
      <Stack className={styles.bodyBox}>
        <TagSearch handleNew={handleNew} />

        <table className={styles.table}>
          {/* Make sure to apply styling if needed */}
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
              <th className={styles.headTitle}>Tag Name</th>
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
            <Stack w="100%" align="start" gap={0}>
              <label htmlFor="name" className={styles.popUpLabel}>
                Enter Tag Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tag Name"
                className={styles.popUpInput}
                value={inputValue}
                onChange={handleInputChange}
              />
            </Stack>
            <button className={styles.addNew} onClick={handleCreate}>
              Create
            </button>
          </Stack>
        </Stack>
      )}

      {editTag && (
        <Stack className={styles.popUp} onClick={() => setEditTag(false)}>
          <Stack
            className={styles.popUpBox}
            onClick={(e) => e.stopPropagation()}
          >
            <Stack w="100%" align="start" gap={0}>
              <label htmlFor="name" className={styles.popUpLabel}>
                Edit Tag Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Category Name"
                className={styles.popUpInput}
                value={editValue.name}
                onChange={handleEditChange}
              />
            </Stack>
            <button
              className={styles.addNew}
              onClick={() => handleEditTag(editValue.id)}
            >
              Edit
            </button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Tags;
