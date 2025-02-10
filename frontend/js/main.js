$(document).ready(function () {
    // Constants for API endpoints
    const API_BASE_URL = "http://localhost:3000";
    const JOBS_API_URL = `${API_BASE_URL}/api/jobs`;

    // Show a loading spinner while fetching job listings
    const showLoadingSpinner = () => {
        $('#job-cards-container').html(`
            <div class="text-center">
                <div class="spinner-border text-primary neon-spinner" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Loading jobs...</p>
            </div>
        `);
    };

    // Hide the loading spinner
    const hideLoadingSpinner = () => {
        $('#job-cards-container').empty(); // Clear loading spinner
    };

    // Render job listings on the page
    const renderJobListings = (jobs) => {
        if (Array.isArray(jobs) && jobs.length > 0) {
            jobs.forEach((job) => {
                if (job && job.title && job.company && job._id) {
                    $('#job-cards-container').append(`
                        <div class="col-md-4 mb-4">
                            <div class="card shadow-sm job-card">
                                <div class="card-body">
                                    <h5 class="card-title">${job.title}</h5>
                                    <p class="card-text">${job.company}</p>
                                    <a href="#" class="btn btn-apply" data-jobid="${job._id}">Click Here to Apply</a>
                                </div>
                            </div>
                        </div>
                    `);
                } else {
                    console.error('Invalid job data:', job);
                }
            });
        } else {
            // If no job listings are available, show a message
            $('#job-cards-container').append('<p class="text-center">No job listings available.</p>');
        }
    };

    // Fetch job listings from the backend
    const fetchJobListings = () => {
        showLoadingSpinner(); // Show loading spinner

        $.get(JOBS_API_URL, function (data) {
            console.log('Job listings received:', data);
            hideLoadingSpinner(); // Hide loading spinner
            renderJobListings(data); // Render job listings
        }).fail(function (error) {
            console.error('Error fetching job listings:', error);
            hideLoadingSpinner(); // Hide the spinner if an error occurs
            $('#job-cards-container').append('<p class="text-center">Failed to load job listings. Please try again later.</p>');
        });
    };

    // Fetch details of a specific job
    const fetchJobDetails = (jobId) => {
        console.log('Fetching job details for ID:', jobId);
        $.get(`${JOBS_API_URL}/${jobId}`, function (job) {
            console.log('Job details:', job);

            if (job && job._id) {
                // Store the job details in localStorage for easy access in the new tab
                localStorage.setItem('jobDetails', JSON.stringify(job));

                // Redirect to the job application form
                window.open(`apply.html?jobId=${job._id}`, '_blank');
            } else {
                alert('Job details not found.');
            }
        }).fail(function (error) {
            console.error('Error fetching job details:', error);
            alert('Failed to load job details.');
        });
    };

    // Event listener for "Click Here to Apply" buttons
    $(document).on('click', '.btn-apply', function (e) {
        e.preventDefault();
        const jobId = $(this).data('jobid');
        fetchJobDetails(jobId);

        // Animate the button for the click effect
        $(this).addClass('btn-clicked');
        setTimeout(() => {
            $(this).removeClass('btn-clicked');
        }, 300); // Reset button style after animation
    });

    // Initialize job listings on page load
    fetchJobListings();

    // Custom animations for buttons
    $(document).on('mouseenter', '.btn-apply', function () {
        $(this).css({
            transform: 'scale(1.05)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        });
    });

    $(document).on('mouseleave', '.btn-apply', function () {
        $(this).css({
            transform: 'scale(1)',
            boxShadow: 'none'
        });
    });
});
