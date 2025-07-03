"use client";

import { Flex, Popover, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./blogId.module.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useParams } from "next/navigation";
import Comments from "@/components/comments";
import JoinUs from "@/components/joinUs";
import Link from "next/link";

interface PostTag {
  id: string;
  postId: string;
  tagId: string;
  tag: {
    id: string;
    name: string;
  };
}

const BlogContents = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<{
    id?: string;
    imageUrl: string;
    title: string;
    description?: string;
    contributor?: string;
    categories?: string;
    tags?: PostTag[];
    createdAt: string;
    authorId?: string;
    author?: {
      email?: string;
      fullName?: string;
      id?: string;
    };
  } | null>(null);

  const [tags, setTags] = useState<PostTag[]>([]);
  const [contributor, setContributor] = useState<{
    id: string;
    fullName: string;
    role: string;
  }>({
    id: "",
    fullName: "",
    role: "",
  });

  const [articles, setArticles] = useState<
    {
      id?: string;
      imageUrl: string;
      title: string;
      description?: string;
      contributor?: string;
      category?: string;
      createdAt: string;
      authorId?: string;
      author?: {
        email?: string;
        fullName?: string;
        id?: string;
      };
    }[]
  >();

  const [readTime, setReadTime] = useState<number>(0);

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const created = new Date(blog?.createdAt || "").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const home = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${url}/api/v1/posts/${blogId}`);
        const response2 = await fetch(`${url}/api/v1/posts/`);
        const data = await response.json();
        const data2 = await response2.json();
        setBlog(data.data || null);
        setTags(data.data?.tags || []);
        setContributor(
          data.data?.contributorsList[0].user || {
            id: "",
            fullName: "",
            role: "",
          }
        );
        console.log("Blog Data:", data.data);
        setArticles(data2.data || null);
        setReadTime(getReadingTime(blog?.description || ""));
      } catch (error) {
        console.error("Error fetching recent blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const socialIcons = [
    {
      src: "/icons/fbBlog.svg",
      alt: "facebook icon",
      link: "https://www.facebook.com/share/14N6e7xVyM/?mibextid=LQQJ4d",
    },
    {
      src: "/icons/emBlog.svg",
      alt: "email icon",
      link: `mailto:?subject=Read this great blog post&body=Hey! I found this blog post really insightful and thought you'd like it too: ${home}/${blogId}`,
    },
    {
      src: "/icons/twBlog.svg",
      alt: "twitter icon",
      link: "https://x.com/appsolutehub?s=21",
    },
    {
      src: "/icons/inBlog.svg",
      alt: "linkedIn icon",
      link: "https://www.linkedin.com/company/appsolutehub/",
    },
    {
      src: "/icons/copyBlog.svg",
      alt: "copy link icon",
      link: "#copy",
    },
  ];

  return blog ? (
    <>
      <Head>
        <title>{blog?.title}</title>
        <meta
          name="keywords"
          content={
            blog?.tags
              ? blog.tags.map((tag) => tag.tag.name).join(", ")
              : undefined
          }
        />
      </Head>
      <Stack className={styles.blogId}>
        <Image
          src={blog?.imageUrl || ""}
          alt="post image"
          width={100}
          height={100}
          className={styles.blogImg}
        />
        <Flex className={styles.blogFlex}>
          {/* Main Content  */}
          <Stack className={styles.blogSub}>
            <Title className={styles.blogTitle}>{blog?.title}</Title>

            <Flex className={styles.blogGroup}>
              <ul
                style={{ paddingInlineStart: "0" }}
                className={styles.blogPack}
              >
                <p className={styles.tag}>{tags[0]?.tag.name}</p>
                <p className={styles.tag2}>{tags[1]?.tag.name}</p>
                <p className={styles.tag3}>{tags[2]?.tag.name}</p>
              </ul>

              <ul
                style={{ paddingInlineStart: "0" }}
                className={styles.blogPack}
              >
                <p className={styles.tag2}>{readTime} mins read</p>
                <p className={styles.blogtext}>{created}</p>
              </ul>

              <ul
                style={{ paddingInlineStart: "0" }}
                className={styles.blogPack}
              >
                {socialIcons.map((icon, idx) =>
                  icon.link === "#copy" ? (
                    <Popover key={idx} position="top" withArrow shadow="md">
                      <Popover.Target>
                        <Image
                          src={icon.src}
                          alt={icon.alt}
                          width={30}
                          height={30}
                          style={{ cursor: "pointer" }}
                          onMouseDown={() =>
                            navigator.clipboard.writeText(`${home}/${blogId}`)
                          }
                        />
                      </Popover.Target>
                      <Popover.Dropdown>
                        <Text size="xs">Copied!!!</Text>
                      </Popover.Dropdown>
                    </Popover>
                  ) : (
                    <a
                      href={icon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={idx}
                    >
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={30}
                        height={30}
                      />
                    </a>
                  )
                )}
              </ul>
            </Flex>

            {/* <Stack hiddenFrom="md" className={styles.paraGroup}>
            <Text className={styles.paraText}>Introduction</Text>
            <Text className={styles.paraText}>What about the chyea</Text>
            <Text className={styles.paraText}>Tutorials</Text>
            <Text className={styles.paraText}>Payments options</Text>
            <Text className={styles.paraText}>Conclusion</Text>
          </Stack> */}

            {/* <Text className={styles.mainText}>{blog?.description}</Text> */}
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {blog?.description}
            </ReactMarkdown>

            {/* Comments */}
            <Comments
              postId={Array.isArray(blogId) ? blogId[0] : blogId || ""}
            />

            {/* For mobile only */}
            <Stack hiddenFrom="md" className={styles.writerGroup}>
              <Title order={3} className={styles.asideHeader}>
                Written by
              </Title>
              <Flex className={styles.writerProfile}>
                <Image
                  src={"/images/hero1.png"}
                  alt="author profile picture"
                  width={56}
                  height={56}
                  className={styles.writerImg}
                />
                <Stack className={styles.nameGroup}>
                  <Title order={4} className={styles.writerName}>
                    {contributor?.fullName}
                  </Title>
                  <Text className={styles.writerText}>
                    {contributor?.role} at Appsolute
                  </Text>
                </Stack>
              </Flex>
            </Stack>

            {/* <Stack hiddenFrom="md" className={styles.writerGroup}>
            <Title order={3} className={styles.asideHeader}>
              Contributors
            </Title>
            <Flex className={styles.writerProfile}>
              <Image
                src={"/images/hero1.png"}
                alt="author profile picture"
                width={56}
                height={56}
                className={styles.writerImg}
              />
              <Stack className={styles.nameGroup}>
                <Title order={4} className={styles.writerName}>
                  {blog?.contributor}
                </Title>
                <Text className={styles.writerText}>
                  Chief Editor at Appsolute
                </Text>
              </Stack>
            </Flex>
            <Flex className={styles.writerProfile}>
              <Image
                src={"/images/hero1.png"}
                alt="author profile picture"
                width={56}
                height={56}
                className={styles.writerImg}
              />
              <Stack className={styles.nameGroup}>
                <Title order={4} className={styles.writerName}>
                  {blog?.contributor}
                </Title>
                <Text className={styles.writerText}>
                  Chief Editor at Appsolute
                </Text>
              </Stack>
            </Flex>
          </Stack> */}

            <Stack hiddenFrom="md" className={styles.writerGroup}>
              <Title order={3} className={styles.asideHeader}>
                More Articles
              </Title>
              {articles?.slice(0, 3).map((item, index) => {
                const articleTime = new Date(
                  item?.createdAt || ""
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                return (
                  <Flex key={index} className={styles.writerProfile}>
                    <Image
                      src={item.imageUrl}
                      alt="Article thumbnail"
                      width={56}
                      height={56}
                      className={styles.writerImg}
                    />
                    <Stack className={styles.nameGroup}>
                      <Link
                        className={styles.writerLink}
                        href={`/blog/${item.id}`}
                      >
                        <Text className={styles.writerName} lineClamp={2}>
                          {item.title}
                        </Text>
                      </Link>
                      <Text className={styles.timeText}>{articleTime}</Text>
                    </Stack>
                  </Flex>
                );
              })}
            </Stack>

            <Stack hiddenFrom="md" className={styles.youtubeBox}>
              <Text className={styles.youtubeText}>
                Subscribe to our YouTube Channel and enjoy our great contents
              </Text>
              <Flex className={styles.youtubeFlex}>
                <Image
                  src={"/images/logo.svg"}
                  alt="author profile picture"
                  width={56}
                  height={56}
                  className={styles.writerImg}
                />
                <Stack className={styles.appFlex}>
                  <Title order={3} className={styles.asideHeader}>
                    AppSoluteHub
                  </Title>
                  <Text className={styles.writerText}>@appsolutehub</Text>
                </Stack>
              </Flex>
              <Link
                href={"https://youtube.com/@appsolutehub?si=i4tjPWK2JXzxIWZK"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.youtubeButton}
              >
                Subscribe
              </Link>
            </Stack>
          </Stack>

          {/* Aside Bar  */}
          <Stack className={styles.aside}>
            {/* <Stack className={styles.paraGroup}>
            <Text className={styles.paraText}>Introduction</Text>
            <Text className={styles.paraText}>What about the chyea</Text>
            <Text className={styles.paraText}>Tutorials</Text>
            <Text className={styles.paraText}>Payments options</Text>
            <Text className={styles.paraText}>Conclusion</Text>
          </Stack> */}

            <Stack className={styles.writerGroup}>
              <Title order={3} className={styles.asideHeader}>
                Written by
              </Title>
              <Flex className={styles.writerProfile}>
                <Image
                  src={"/images/hero1.png"}
                  alt="author profile picture"
                  width={56}
                  height={56}
                  className={styles.writerImg}
                />
                <Stack className={styles.nameGroup}>
                  <Title order={4} className={styles.writerName}>
                    {contributor?.fullName}
                  </Title>
                  <Text className={styles.writerText}>
                    {contributor?.role} at Appsolute
                  </Text>
                </Stack>
              </Flex>
            </Stack>

            {/* <Stack className={styles.writerGroup}>
            <Title order={3} className={styles.asideHeader}>
              Contributors
            </Title>
            <Flex className={styles.writerProfile}>
              <Image
                src={"/images/hero1.png"}
                alt="author profile picture"
                width={56}
                height={56}
                className={styles.writerImg}
              />
              <Stack className={styles.nameGroup}>
                <Title order={4} className={styles.writerName}>
                  {blog?.contributor}
                </Title>
                <Text className={styles.writerText}>
                  Chief Editor at Appsolute
                </Text>
              </Stack>
            </Flex>
            <Flex className={styles.writerProfile}>
              <Image
                src={"/images/hero1.png"}
                alt="author profile picture"
                width={56}
                height={56}
                className={styles.writerImg}
              />
              <Stack className={styles.nameGroup}>
                <Title order={4} className={styles.writerName}>
                  {blog?.contributor}
                </Title>
                <Text className={styles.writerText}>
                  Chief Editor at Appsolute
                </Text>
              </Stack>
            </Flex>
          </Stack> */}

            <Stack className={styles.writerGroup}>
              <Title order={3} className={styles.asideHeader}>
                More Articles
              </Title>
              {articles?.slice(0, 3).map((item, index) => {
                const articleTime = new Date(
                  item?.createdAt || ""
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                return (
                  <Flex key={index} className={styles.writerProfile}>
                    <Image
                      src={item.imageUrl}
                      alt="Article thumbnail"
                      width={56}
                      height={56}
                      className={styles.writerImg}
                    />
                    <Stack className={styles.nameGroup}>
                      <Link href={`/blog/${item.id}`}>
                        <Text className={styles.writerName} lineClamp={2}>
                          {item.title}
                        </Text>
                      </Link>
                      <Text className={styles.timeText}>{articleTime}</Text>
                    </Stack>
                  </Flex>
                );
              })}
            </Stack>

            <Stack className={styles.youtubeBox}>
              <Text className={styles.youtubeText}>
                Subscribe to our YouTube Channel and enjoy our great contents
              </Text>
              <Flex className={styles.youtubeFlex}>
                <Image
                  src={"/images/hero1.png"}
                  alt="author profile picture"
                  width={56}
                  height={56}
                  className={styles.writerImg}
                />
                <Stack className={styles.appFlex}>
                  <Title order={3} className={styles.asideHeader}>
                    AppSoluteHub
                  </Title>
                  <Text className={styles.writerText}>@appsolutehub</Text>
                </Stack>
              </Flex>
              <Link
                href={"https://youtube.com/@appsolutehub?si=i4tjPWK2JXzxIWZK"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.youtubeButton}
              >
                Subscribe
              </Link>
            </Stack>
          </Stack>
        </Flex>

        <JoinUs />
      </Stack>
    </>
  ) : null;
};

export default BlogContents;
