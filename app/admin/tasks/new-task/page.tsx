"use client";

import {
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./newTask.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUserToken } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import LoadingBar from "../../loading";

const NewTask = () => {
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
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [option1, setOption1] = useState<string>("");
  const [option2, setOption2] = useState<string>("");
  const [option3, setOption3] = useState<string>("");
  const [option4, setOption4] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
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

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
      } catch (error) {
        console.error("Error:", (error as Error).message);
      }
    }
  };

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

  const options = [option1, option2, option3, option4]
    .map((opt) => opt.trim())
    .filter((opt) => opt !== "");

  const uniqueOptions = Array.from(new Set(options));

  const questionOptions = [
    option1.trim(),
    option2.trim(),
    option3.trim(),
    option4.trim(),
  ];

  interface Question {
    questionText: string;
    options: string[];
    correctAnswer: string;
  }

  const [questionStructure, setQuestionStructure] = useState<Question[]>([]);

  const createTask = async () => {
    console.log(questionStructure);
    if (!selectedCategories.length) {
      alert("Please select at least one category");
      return;
    }

    if (!selectedTags.length) {
      alert("Please select at least one tag");
      return;
    }

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    const tags = selectedTags.map((tag) => tag.trim()).join(",");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", title);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("tags", JSON.stringify([tags]));
    formData.append("url", url);
    formData.append("points", totalPoints.toString());
    formData.append("questions", JSON.stringify(questionStructure));
    formData.append("file", imageFile as Blob);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await fetch(`${baseUrl}/api/v1/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();
      console.log("Task created:", data);
      router.push("/admin/tasks");
    } catch (error) {
      console.error("Error:", (error as Error).message);
      alert("Error creating blog post");
    } finally {
      setLoading(false);
    }
  };

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

  const [selected, setSelected] = useState("blog");
  const [active, setActive] = useState(0);
  const nextStep = () => {
    if (
      title.trim() === "" ||
      url.trim() === "" ||
      option1.trim() === "" ||
      option2.trim() === "" ||
      option3.trim() === "" ||
      option4.trim() === "" ||
      answer.trim() === "" ||
      points === 0
    ) {
      alert("Please fill in all fields");
      return;
    }

    setActive((prev) => prev + 1);
    // setActive((current) => (current < 4 ? current + 1 : current));
    const newTask = {
      questionText: title,
      options: questionOptions,
      correctAnswer: answer.trim(),
    };

    setQuestionStructure((prev) => [...prev, newTask]);
    setTotalPoints((prev) => prev + points);
    if (active === 3) {
      return;
    }
    setTitle("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
    setUrl("");
    // setPoints(0);
  };

  return (
    <Stack>
      <Flex className={styles.headContainer}>
        <Flex className={styles.headFlex}>
          <Link href={"/admin/tasks"} passHref className={styles.backLink}>
            <Image src={"/icons/back.svg"} alt="" width={20} height={20} />
            back
          </Link>
          <Title className={styles.headTitle}>Add New Task</Title>
        </Flex>
        <Flex className={styles.headFlex}>
          <Link href={"/"} passHref className={styles.link}>
            <Image src={"/icons/home.svg"} alt="" width={20} height={20} />
            <Text className={styles.headText}>Home</Text>
          </Link>
          <Image src={"/icons/right.svg"} alt="" width={10} height={10} />
          <Text className={styles.text}>Tasks</Text>
        </Flex>
      </Flex>

      <Stack className={styles.editorBox}>
        <Flex className={styles.editFlex}>
          <Stack className={styles.editorBoxSide}>
            <Stack w="100%">
              <Title className={styles.subTaskHead}>Platform</Title>
              <Text className={styles.label}>
                Select the platform you are setting the question from
              </Text>
            </Stack>

            <Flex w="100%" gap="10px">
              <label
                onClick={() => setSelected("blog")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: `2px solid ${
                    selected === "blog" ? "#34449C" : "#B7B7B7"
                  }`,
                  cursor: "pointer",
                  fontWeight: selected === "blog" ? "600" : "normal",
                  color: selected === "blog" ? "#34449C" : "#B7B7B7",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    marginRight: "8px",
                    borderRadius: "50%",
                    border: `2px solid ${
                      selected === "blog" ? "#34449C" : "#B7B7B7"
                    }`,
                    backgroundColor:
                      selected === "blog" ? "#34449C" : "transparent",
                  }}
                ></span>
                From Blog
              </label>

              <label
                onClick={() => setSelected("youtube")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: `2px solid ${
                    selected === "youtube" ? "#34449C" : "#B7B7B7"
                  }`,
                  cursor: "pointer",
                  fontWeight: selected === "youtube" ? "600" : "normal",
                  color: selected === "youtube" ? "#34449C" : "#B7B7B7",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    marginRight: "8px",
                    borderRadius: "50%",
                    border: `2px solid ${
                      selected === "youtube" ? "#34449C" : "#B7B7B7"
                    }`,
                    backgroundColor:
                      selected === "youtube" ? "#34449C" : "transparent",
                  }}
                ></span>
                From YouTube
              </label>
            </Flex>

            <Box w="70%">
              <Stepper active={active}>
                {Array.from({ length: questionStructure.length + 1 }).map(
                  (_, index) => (
                    <Stepper.Step key={index} />
                  )
                )}
              </Stepper>
              {/* <Stepper active={active}>
                <Stepper.Step />
                <Stepper.Step />
                <Stepper.Step />
                <Stepper.Step />
              </Stepper> */}
            </Box>

            <Stack w="100%">
              <input
                type="text"
                placeholder="Enter Question"
                className={styles.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Title className={styles.subTaskHead}>Enter URL</Title>
              <Text className={styles.label}>
                Copy the blog or video URL and paste here
              </Text>
              <input
                type="text"
                placeholder="Enter URL"
                className={styles.ansInput}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Stack>

            <Stack w="100%">
              <Title className={styles.subTaskHead}>Create Options</Title>
              <Text className={styles.label}>
                It must be four &#40;4&#41; options. One of them must be
                correct.
              </Text>
              <input
                type="text"
                placeholder="Enter Option 1"
                className={styles.ansInput}
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Option 2"
                className={styles.ansInput}
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Option 3"
                className={styles.ansInput}
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Option 4"
                className={styles.ansInput}
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
              />
            </Stack>

            <Stack w="100%">
              <Title className={styles.subTaskHead}>
                Select the answer and Points to award
              </Title>
              <Text className={styles.label}>
                Select which of the options is the answer to the question above
              </Text>
              <Flex w="100%" gap="10px" wrap="nowrap">
                <Select
                  placeholder="Select Option"
                  data={uniqueOptions}
                  radius="xl"
                  className={styles.select}
                  onChange={(value) => setAnswer(value || "")}
                />
                <Select
                  placeholder="Select points"
                  data={[
                    { label: "100 points", value: "100" },
                    { label: "200 points", value: "200" },
                    { label: "300 points", value: "300" },
                    { label: "400 points", value: "400" },
                  ]}
                  radius="xl"
                  className={styles.select}
                  onChange={(value) => setPoints(Number(value))}
                />
              </Flex>
            </Stack>

            <Stack w="100%" align="end">
              <Button className={styles.nextBtn} onClick={nextStep}>
                Next
              </Button>
            </Stack>
          </Stack>

          <Stack className={styles.sideBar}>
            <Stack className={styles.btnStack}>
              <Stack w="100%" align="center" justify="center">
                <button className={styles.previewBtn}>Preview</button>
                <button className={styles.publishBtn} onClick={createTask}>
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
                <input type="text" className={styles.addTagInput} />
                <button onClick={addTag} className={styles.addTagBtn}>
                  Add
                </button>
              </Flex>
              <div className="w-full flex flex-col gap-2 max-h-40 overflow-y-auto">
                {tagsList.map((tag, index) => (
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

export default NewTask;
