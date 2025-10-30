import { useMemo } from "react";

interface Post {
  frontmatter: {
    thumbnail?: string;
    thumbnailFile?: {
      publicURL: string;
    };
    [key: string]: any;
  };
  parent?: {
    relativePath?: string;
    relativeDirectory?: string;
  };
  fields?: {
    [key: string]: any;
  };
  timeToRead?: number;
}

interface FileNode {
  publicURL: string;
  relativePath: string;
  relativeDirectory: string;
}

export const useThumbnail = (post: Post, allFiles: FileNode[]) => {
  return useMemo(() => {
    const { thumbnail, thumbnailFile } = post.frontmatter;

    // 이미 thumbnailFile이 있으면 사용
    if (thumbnailFile?.publicURL) {
      return thumbnailFile.publicURL;
    }

    // 외부 URL이면 그대로 사용
    if (thumbnail && (thumbnail.startsWith("http://") || thumbnail.startsWith("https://"))) {
      return thumbnail;
    }

    // 상대 경로인 경우 매칭
    if (thumbnail && post.parent && post.parent.relativeDirectory) {
      const thumbnailFileName = thumbnail.replace("./", "");
      const matchedFile = allFiles.find(
        (file) =>
          file.relativeDirectory === post.parent!.relativeDirectory &&
          file.relativePath.endsWith(thumbnailFileName)
      );

      if (matchedFile) {
        return matchedFile.publicURL;
      }
    }

    return thumbnail;
  }, [post, allFiles]);
};
