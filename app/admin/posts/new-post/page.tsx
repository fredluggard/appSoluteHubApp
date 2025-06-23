"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./newPost.module.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToMarkdown from "draftjs-to-markdown";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUser, getUserToken } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import LoadingBar from "@/app/admin/loading";

const NewPosts = () => {
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState<string[]>([
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Web Development",
  ]);

  const [tagsList, setTagsList] = useState<string[]>([
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Web Development",
  ]);

  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const user = useSelector(getUser);
  const token = useSelector(getUserToken);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const addCategory = async () => {
    const newCategory = prompt("Enter new category name");
    if (newCategory) {
      setCategoriesList([...categoriesList, newCategory]);
      try {
        const response = await fetch(`${baseUrl}/api/v1/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newCategory,
          }),
        });

        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to create Category");
        }

        const data = await response.json();
        console.log("Category created:", data);
        setTagInput("");
      } catch (error) {
        console.error("Error:", (error as Error).message);
      }
    }
  };

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [tagInput, setTagInput] = useState("");
  const createTag = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: tagInput,
        }),
      });

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to create tag");
      }

      const data = await response.json();
      console.log("Tag created:", data);
      // setTagsList((prevTags) => [...prevTags, tagInput]);
      setTagInput("");
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };
  const addTag = () => {
    if (tagInput) {
      setTagsList([...tagsList, tagInput]);
      createTag();
    }
  };

  const uploadImageCallBack = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${baseUrl}/api/v1/posts/image-upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log("Image upload response:", data);

    // The returned object must match this shape:
    return { data: { link: data.data.imageUrl } };
  };

  async function createBlogPost() {
    const description = convertToRaw(editorState.getCurrentContent());
    const markdown = draftToMarkdown(description);
    console.log("Markdown text:", markdown);
    if (!title || !imageFile || markdown === "") {
      alert("Please fill in all fields");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("Please select at least one category");
      return;
    }
    if (selectedTags.length === 0) {
      alert("Please select at least one tag");
      return;
    }
    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", markdown);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("file", imageFile as Blob);
    formData.append("contributors", JSON.stringify([user.email]));
    formData.append("tags", JSON.stringify(selectedTags));

    try {
      const response = await fetch(`${baseUrl}/api/v1/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      const data = await response.json();
      console.log("Blog post created:", data);
      router.push("/admin/posts");
    } catch (error) {
      console.error("Error:", (error as Error).message);
      alert("Error creating blog post");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/tags`);
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to fetch tag");
        }

        const data = await response.json();
        console.log("Tags fetched:", data);
        const list = data.map((tag: { name: string }) => tag.name);
        setTagsList(list);
      } catch (error) {
        console.error("Error:", (error as Error).message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/categories`);
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to fetch Categories");
        }

        const data = await response.json();
        console.log("Categories fetched:", data);
        const list = data.map((tag: { name: string }) => tag.name);
        setCategoriesList(list);
      } catch (error) {
        console.error("Error:", (error as Error).message);
      }
    };

    fetchCategories();
    fetchTag();
  }, []);

  return (
    <Stack>
      <Flex className={styles.headContainer}>
        <Flex className={styles.headFlex}>
          <Link href={"/admin/posts"} passHref className={styles.backLink}>
            <Image src={"/icons/back.svg"} alt="" width={20} height={20} />
            back
          </Link>
          <Title className={styles.headTitle}>Add New Post</Title>
        </Flex>
        <Flex className={styles.headFlex}>
          <Link href={"/"} passHref className={styles.link}>
            <Image src={"/icons/home.svg"} alt="" width={20} height={20} />
            <Text className={styles.headText}>Home</Text>
          </Link>
          <Image src={"/icons/right.svg"} alt="" width={10} height={10} />
          <Text className={styles.text}>Posts</Text>
        </Flex>
      </Flex>

      <Stack className={styles.editorBox}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.title}
        />
        <Flex className={styles.desBox}>
          <header className={styles.des}>Description</header>
        </Flex>
        <Flex className={styles.editFlex}>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "embedded",
                "emoji",
                "image",
                "remove",
                "history",
              ],
              inline: {
                options: [
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "monospace",
                  "superscript",
                  "subscript",
                ],
              },
              list: {
                options: ["unordered", "ordered", "indent", "outdent"],
              },
              textAlign: {
                options: ["left", "center", "right", "justify"],
              },
              link: {
                options: ["link", "unlink"],
              },
              history: {
                options: ["undo", "redo"],
              },
              image: {
                icon: image,
                urlEnabled: true,
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: uploadImageCallBack,
                previewImage: false,
                inputAccept:
                  "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                alt: { present: false, mandatory: false },
                defaultSize: {
                  height: "auto",
                  width: "auto",
                },
              },
            }}
            hashtag={{
              separator: " ",
              trigger: "#",
            }}
            mention={{
              separator: " ",
              trigger: "@",
              suggestions: [
                { text: "JavaScript", value: "javascript", url: "js" },
                { text: "Golang", value: "golang", url: "go" },
              ],
            }}
          />
          <Stack className={styles.sideBar}>
            <Stack className={styles.btnStack}>
              <Stack w="100%" align="center" justify="center">
                <button className={styles.previewBtn}>Preview</button>
                <button className={styles.publishBtn} onClick={createBlogPost}>
                  Publish
                </button>
              </Stack>
            </Stack>

            <Stack className={styles.btnStack}>
              <Text className={styles.tagHead}>Feature Image</Text>
              <div className="w-[100%] h-44 border-2 border-dashed border-orange-400 flex flex-col items-center justify-center relative rounded-md overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center text-orange-400">
                    <Image
                      src={"/icons/upload.svg"}
                      alt="Upload"
                      width={40}
                      height={40}
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  id="fileInput"
                />
              </div>

              <Stack w="100%" align="center" justify="center">
                <label htmlFor="fileInput" className={styles.tagAction}>
                  + Add Image
                </label>
              </Stack>
            </Stack>

            <Stack className={styles.btnStack}>
              <Text className={styles.tagHead}>Select Category</Text>
              <div className="w-full flex flex-col gap-2 max-h-40 overflow-y-auto">
                {categoriesList.map((category, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className={styles.checkbox}
                    />
                    {category}
                  </label>
                ))}
              </div>

              {/* Add Category button */}
              <Stack w="100%" align="center" justify="center">
                <button onClick={addCategory} className={styles.tagAction}>
                  + Add Category
                </button>
              </Stack>
            </Stack>

            <Stack className={styles.btnStack}>
              <Text className={styles.tagHead}>Tags</Text>
              <Flex className={styles.addTagFlex}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className={styles.addTagInput}
                />
                <button onClick={addTag} className={styles.addTagBtn}>
                  Add
                </button>
              </Flex>
              <div className="w-full flex flex-col gap-2 max-h-40 overflow-y-auto">
                {tagsList?.map((tag, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className={styles.checkbox}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </Stack>
          </Stack>
        </Flex>
      </Stack>

      {loading && (
        <Stack
          pos="absolute"
          w="100%"
          h="100vh"
          bg="#00000080"
          justify="center"
          align="center"
        >
          <LoadingBar />
        </Stack>
      )}
    </Stack>
  );
};

export default NewPosts;
