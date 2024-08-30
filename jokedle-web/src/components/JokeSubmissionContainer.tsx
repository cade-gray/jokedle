import { useState } from "react";

export const JokeSubmissionContainer = () => {
  const [setup, setSetup] = useState('');
  const [punchline, setPunchline] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const Joke = {
      setup: setup,
      punchline: punchline,
      source: source,
    };

    try {
      const response = await fetch('https://api.cadegray.dev/joke/submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Joke),
      });

      if (response.ok) {
        // Handle successful submission
        alert('Joke submitted successfully. Thank you!');
      } else {
        // Handle errors
        alert('Error submitting joke, please try again. Apologies for the inconvenience.');
      }
    } catch (error) {
      // Commented out for security reasons to prevent leaking information.  If needed, look into logging to a secure location.
      //console.error('Error:', error);
    }
    // Clear form fields
    setSetup('');
    setPunchline('');
    setSource('');
  };

  return (
    <div className="flex flex-col m-3 p-3 border border-jokedle rounded-md shadow-md shadow-[#4ac4da]">
      <h1 className="text-3xl text-center">Submit a Joke</h1>
      <p className="text-lg text-center">
        If you have a joke you would like to share, you may submit it here. It will be reviewed before being added to the list of jokes.
        Keep in mind that jokes must not be too cheesy, inappropriate, or offensive to be accepted into the list. My goal is to keep it to jokes that
        I find funny and mostly suitable for everyone.
      </p>
      <form
        className="flex flex-col m-3 p-3 border border-jokedle rounded-md shadow-md shadow-[#4ac4da]"
        onSubmit={handleSubmit}
      >
        <label className="text-lg">Setup</label>
        <textarea
          className="m-1 p-1 border border-gray-600 rounded-md shadow-lg"
          name="setup"
          value={setup}
          onChange={(e) => setSetup(e.target.value)}
          maxLength={255}
          required
        />
        <label className="text-lg">Punchline</label>
        <textarea
          className="m-1 p-1 border border-gray-600 rounded-md shadow-lg"
          name="punchline"
          value={punchline}
          onChange={(e) => setPunchline(e.target.value)}
          maxLength={50}
          required
        />
        <label className="text-lg">Submitted By</label>
        <input
          className="m-1 p-1 border border-gray-600 rounded-md shadow-lg dark:bg-[#222222]"
          type="text"
          name="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          maxLength={45}
          required
        />
        <button
          className="m-1 p-1 border border-gray-600 rounded-md shadow-lg text-lg hover:border-jokedle hover:shadow-[#4ac4da] dark:text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};