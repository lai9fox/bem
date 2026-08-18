interface ImportMetaEnv {
  readonly PUBLIC_GIT_SHA: string;
  readonly PUBLIC_GIT_SHA_FULL: string;
  readonly PUBLIC_BUILD_TIME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
