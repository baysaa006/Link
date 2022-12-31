import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import { profile } from "console";

type Link = {
  title: string;
  url: string;
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const [links, setLinks] = useState<Link[]>();
  const [images, setImages] = useState<ImageListType>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<
    string | undefined
  >();
  const router = useRouter();
  const { creatorSlug } = router.query;

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log("user", user);
      if (user.data.user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getLinks = async () => {
      try {
        const { data, error } = await supabase
          .from("links")
          .select("title, url")
          .eq("user_id", userId);

        if (error) throw error;
        setLinks(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    if (userId) {
      getLinks();
    }
  }, [userId]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("id, profile_picture_url")
          .eq("username", creatorSlug);
        if (error) throw error;

        const profilePictureUrl = data[0]["profile_picture_url"];
        const userId = data[0]["id"];
        setProfilePictureUrl(profilePictureUrl);
        setUserId(userId);
        if (userId !== userId) {
          router.push("/");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };

    if (creatorSlug) {
      getUser();
    }
  }, [creatorSlug]);

  const addNewLink = async () => {
    try {
      if (title && url && userId) {
        const { data, error } = await supabase
          .from("links")
          .insert({
            title: title,
            url: url,
            user_id: userId,
          })
          .select();
        if (error) throw error;
        console.log("data: ", data);
        if (links) {
          setLinks([...data, ...links]);
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const uploadProfilePicture = async () => {
    try {
      if (images.length > 0) {
        const image = images[0];
        if (image.file && userId) {
          const { data, error } = await supabase.storage
            .from("public")
            .upload(`${userId}/${image.file.name}`, image.file, {
              upsert: true,
            });
          if (error) throw error;
          const resp = supabase.storage.from("public").getPublicUrl(data.path);
          const publicUrl = resp.data.publicUrl;
          const updateUserReponse = await supabase
            .from("users")
            .update({ profile_picture_url: publicUrl })
            .eq("id", userId);
          if (updateUserReponse.error) throw error;
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center  pb-4 justify-between w-full  h-screen">
      <div className="py-8 flex  gap-3 flex-col h-fit w-full justify-between items-center mt-4">
        {profilePictureUrl && (
          <Image
            src={profilePictureUrl}
            alt="profile-picture"
            height={100}
            width={100}
            className="rounded-full border-2 border-lime-300"
          />
        )}
        <div className="flex">
          <h1
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.open(`${creatorSlug}`, "_blank");
            }}
          >{`@${creatorSlug}`}</h1>
          <i>🥳</i>
        </div>

        {links?.map((link: Link, index: number) => (
          <div
            className="shadow-md hover:translate-x-1 hover:translate-y-1 shadow-lime-200 w-96 bg-lime-300 mt-4 p-4 rounded-lg text-center font-bold cursor-pointer  text-gray-900"
            key={index}
            onClick={(e) => {
              e.preventDefault();
              window.open(link.url, "_blank");
            }}
          >
            {link.title}
          </div>
        ))}
        {isAuthenticated && (
          <>
            <div>
              <h1> New link creation </h1>
              <div className="mt-4">
                <div className="block text-sm font-medium text-gray-700">
                  Title
                </div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="my awesome link"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <div className="block text-sm font-medium text-gray-700">
                  URL
                </div>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="https://www.youtube.com/c/YourAverageTechBro"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
                onClick={addNewLink}
              >
                Add new link
              </button>
            </div>

            <div>
              <h1> Image uploading </h1>
              {images.length > 0 && (
                <Image
                  src={images[0]["data_url"]}
                  height={100}
                  width={100}
                  alt="profile-picture"
                />
              )}
              {/* <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemoveAll, isDragging, dragProps }) => (
                // write your building UI
                <div className="upload__image-wrapper bg-slate-300 flex justify-center p-4 rounded-lg underline text-base">
                  {images.length === 0 ? (
                    <button
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                      className="w-3/4"
                    >
                      Click to upload a new image or drag and drop a new image
                      here
                    </button>
                  ) : (
                    <button onClick={onImageRemoveAll}>
                      Remove all images
                    </button>
                  )}
                </div>
              )}
            </ImageUploading> */}

              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
                onClick={uploadProfilePicture}
              >
                Upload profile picture
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
