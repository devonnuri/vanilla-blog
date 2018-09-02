import { Request, Response } from '../../lib/express';
import { firestore } from 'firebase-admin';

const tagsRef = firestore().collection('tags');

export const createTag = async (request: Request, response: Response) => {
  const { tagName: name } = request.params;

  tagsRef
    .where('name', '==', name)
    .get()
    .then(snapshot => {
      if (!snapshot.empty) {
        response.status(409).json({
          name: 'DUPLICATED_TAG',
          payload: name,
        });
        return;
      }

      tagsRef.add({ name });
      response.json({ name });
    });
};

export const listTag = async (request: Request, response: Response) => {
  tagsRef
    .get()
    .then(snapshot => {
      response.json(snapshot.docs.map(doc => doc.data()));
    })
    .catch(() => {
      response.sendStatus(500);
    });
};

export const deleteTag = async (request: Request, response: Response) => {
  tagsRef
    .where('name', '==', request.params.tagName)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(404).json({
          name: 'TAG_NOT_FOUND',
        });
        return;
      }
      snapshot.docs[0].ref.delete();
      response.sendStatus(204);
    });
};
