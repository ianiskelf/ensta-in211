import { useState } from 'react';
import axios from 'axios';

const DEFAULT_FORM_VALUES = {
  text: '',
  movie: '',
  author: '',

};

const useSaveComment = () => {
  const [CommentCreationError, setCommentCreationError] = useState(null);
  const [CommentCreationSuccess, setCommentCreationSuccess] = useState(null);
  const displayCreationSuccessMessage = () => {
    setCommentCreationSuccess('New Comment created successfully');
    setTimeout(() => {
      setCommentCreationSuccess(null);
    }, 3000);
  };

  const saveComment = (event, formValues, setFormValues) => {
    // This avoid page reload
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/comments/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setCommentCreationError('An error occured while creating new Comment.');
        console.error(error);
      });
  };

  return { saveComment, CommentCreationError, CommentCreationSuccess };
};

function AddCommentForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { saveComment, CommentCreationError, CommentCreationSuccess } = useSaveComment();

  return (
    <div>
      <form
        className="add-Comment-form"
        onSubmit={(event) => saveComment(event, formValues, setFormValues)}
      >
        <input
          className="add-Comment-input"
          type="comment"
          placeholder="Commentaire"
          value={formValues.text}
          onChange={(event) =>
            setFormValues({ ...formValues, text: event.target.value })
          }
        />

        <button className="add-Comment-button" type="submit">
          Add Comment
        </button>
      </form>
      {CommentCreationSuccess !== null && (
        <div className="Comment-creation-success">{CommentCreationSuccess}</div>
      )}
      {CommentCreationError !== null && (
        <div className="Comment-creation-error">{CommentCreationError}</div>
      )}
    </div>
  );
}

export default AddCommentForm;
