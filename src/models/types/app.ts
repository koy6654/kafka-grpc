// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v3.20.3
// source: app.proto

/* eslint-disable */

export enum SendMessageResponseStatus {
  SUCCESS = 0,
  FAILED = 1,
}

export interface SendMessageRequestDto {
  message: string;
}

export interface SendMessageResponseDto {
  status: SendMessageResponseStatus;
}

export interface AppService {
  SendMessage(request: SendMessageRequestDto): Promise<SendMessageResponseDto>;
}
