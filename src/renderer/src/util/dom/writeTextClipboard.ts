export const writeTextClipboard = (text: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        // var msg = successful ? 'successful' : 'unsuccessful';
        resolve();
        // console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        reject(err);
      }

      document.body.removeChild(textArea);
      return;
    }

    navigator.clipboard.writeText(text).then(
      function () {
        resolve();
        // console.log('Async: Copying to clipboard was successful!');
      },
      function (err: any) {
        reject(err);
        // console.error('Async: Could not copy text: ', err);
      }
    );
  });
};
