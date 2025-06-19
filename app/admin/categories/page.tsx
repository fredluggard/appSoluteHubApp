"use client";

import { Flex, Stack } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./cat.module.css";
import Header from "@/components/pageHeader";
import CategorySearch from "@/components/searchComp/categorySearch";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUserToken } from "@/store/userSlice";
import LoadingBar from "@/app/admin/loading";

interface Category {
  id: string;
  name: string;
}

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category[]>([
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

  const [editValue, setEditValue] = useState<Category>({ id: "", name: "" });
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue((prev) => ({ ...prev, name: e.target.value }));
  };
  const [editCategory, setEditCategory] = useState(false);
  const handleEdit = (name: string, id: string) => {
    setEditValue({ id, name });
    setEditCategory(true);
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allIds = useMemo(
    () => category?.map((post) => String(post)) || [],
    [category]
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = useSelector(getUserToken);

  const rows = category?.map((post, index) => (
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
            onClick={() => handleDeleteCategory(post.id)}
          />
        </Flex>
      </td>
    </tr>
  ));

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/categories`);
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      console.log("Categories  fetched:", data);
      // const list = data.map((tag: { name: string }) => tag.name);
      setCategory(data);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (inputValue) {
      try {
        const response = await fetch(`${baseUrl}/api/v1/categories`, {
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
          throw new Error("Failed to create category");
        }

        const data = await response.json();
        console.log("Category created:", data);
      } catch (error) {
        console.error("Error:", (error as Error).message);
      } finally {
        fetchCategories();
        setPopup(false);
        setInputValue("");
      }
    }
  };

  const handleEditCategory = async (id: string) => {
    if (editValue.name !== "") {
      try {
        const response = await fetch(`${baseUrl}/api/v1/categories/${id}`, {
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
          throw new Error("Failed to updated category");
        }

        const data = await response.json();
        console.log("Category updated:", data);
        setEditValue({ id: "", name: "" });
      } catch (error) {
        console.error("Error:", (error as Error).message);
      } finally {
        fetchCategories();
        setEditCategory(false);
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
    } finally {
      fetchCategories();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return loading ? (
    <LoadingBar />
  ) : (
    <Stack pos="relative">
      <Header title="Categories" />
      <Stack className={styles.bodyBox}>
        <CategorySearch handleNew={handleNew} />

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
              <th className={styles.headTitle}>Category Name</th>
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
                Enter Category Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Category Name"
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

      {editCategory && (
        <Stack className={styles.popUp} onClick={() => setEditCategory(false)}>
          <Stack
            className={styles.popUpBox}
            onClick={(e) => e.stopPropagation()}
          >
            <Stack w="100%" align="start" gap={0}>
              <label htmlFor="name" className={styles.popUpLabel}>
                Edit Category Name
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
              onClick={() => handleEditCategory(editValue.id)}
            >
              Edit
            </button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Categories;
