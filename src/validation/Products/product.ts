// @ antdesign validation message
export const errorMessage = (message: string) => {
    return Promise.reject(new Error(message));
};
